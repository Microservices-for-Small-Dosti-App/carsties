using AuctionService.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController(AuctionDbContext context, IMapper mapper) : ControllerBase
{

    private readonly IMapper _mapper = mapper;
    private readonly AuctionDbContext _context = context;

}