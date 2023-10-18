using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint) : ControllerBase
{

    private readonly IMapper _mapper = mapper;
    private readonly AuctionDbContext _context = context;
    private readonly IPublishEndpoint _publishEndpoint = publishEndpoint;

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string? date)
    {
        var query = _context.Auctions.OrderBy(x => x.Item!.Make).AsQueryable();

        if (!string.IsNullOrWhiteSpace(date))
        {
            var parsedDate = DateTime.Parse(date).ToUniversalTime();

            query = query.Where(x => x.UpdatedAt.CompareTo(parsedDate) > 0);
        }

        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var auction = await _context.Auctions
                                    .Include(x => x.Item)
                                    .FirstOrDefaultAsync(x => x.Id == id);

        if (auction is null)
        {
            return NotFound();
        }

        return _mapper.Map<AuctionDto>(auction);
    }

    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
    {
        var auction = _mapper.Map<Auction>(createAuctionDto);

        // TODO: Add current user as seller
        auction.Seller = "No Name";

        _context.Auctions.Add(auction);

        var newAuctionDto = _mapper.Map<AuctionDto>(auction);

        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuctionDto));

        var results = await _context.SaveChangesAsync() > 0;

        if (!results)
        {
            return BadRequest("Could not create auction.");
        }

        return CreatedAtAction(nameof(GetAuctionById), new { id = auction.Id }, newAuctionDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AuctionDto>> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
    {
        var auction = await _context.Auctions.Include(x => x.Item)
                                            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction is null)
        {
            return NotFound();
        }

        // TODO: Check if current user is seller
        auction.Item!.Make = updateAuctionDto.Make ?? auction.Item!.Make;
        auction.Item!.Model = updateAuctionDto.Model ?? auction.Item!.Model;
        auction.Item!.Color = updateAuctionDto.Color ?? auction.Item!.Color;
        auction.Item!.Mileage = updateAuctionDto.Mileage ?? auction.Item!.Mileage;
        auction.Item!.Year = updateAuctionDto.Year ?? auction.Item!.Year;

        _context.Auctions.Update(auction);

        await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

        var results = await _context.SaveChangesAsync() > 0;

        if (!results)
        {
            return BadRequest("Could not update auction.");
        }

        return Ok(_mapper.Map<AuctionDto>(auction));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await _context.Auctions.FirstOrDefaultAsync(x => x.Id == id);

        if (auction is null)
        {
            return NotFound();
        }

        // TODO: Check if current user is seller
        _context.Auctions.Remove(auction);

        await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });

        var results = await _context.SaveChangesAsync() > 0;

        if (!results)
        {
            return BadRequest("Could not delete auction.");
        }

        return NoContent();
    }

}