using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController(AuctionDbContext context, IMapper mapper) : ControllerBase
{

    private readonly IMapper _mapper = mapper;
    private readonly AuctionDbContext _context = context;

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
    {
        var auctions = await _context.Auctions
                                    .Include(x => x.Item)
                                    .OrderBy(x => x.Item!.Make)
                                    .ToListAsync();

        return _mapper.Map<List<AuctionDto>>(auctions);
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
        var results = await _context.SaveChangesAsync() > 0;

        if (!results)
        {
            return BadRequest("Could not create auction.");
        }

        return CreatedAtAction(nameof(GetAuctionById), new { id = auction.Id }, _mapper.Map<AuctionDto>(auction));
    }

}