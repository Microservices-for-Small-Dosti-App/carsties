using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<List<Item>>> SearchItems(string searchTerm) // [FromQuery] SearchParams searchParams
    {
        var query = DB.Find<Item>();

        query.Sort(x => x.Ascending(a => a.Make));

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query.Match(Search.Full, searchTerm).SortByTextScore();
        }

        var result = await query.ExecuteAsync();

        return result;

        // query = searchParams.OrderBy switch
        // {
        //     "make" => query.Sort(x => x.Ascending(a => a.Make))
        //         .Sort(x => x.Ascending(a => a.Model)),
        //     "new" => query.Sort(x => x.Descending(a => a.CreatedAt)),
        //     _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
        // };

        // query = searchParams.FilterBy switch
        // {
        //     "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
        //     "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6)
        //         && x.AuctionEnd > DateTime.UtcNow),
        //     _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
        // };

        // if (!string.IsNullOrEmpty(searchParams.Seller))
        // {
        //     query.Match(x => x.Seller == searchParams.Seller);
        // }

        // if (!string.IsNullOrEmpty(searchParams.Winner))
        // {
        //     query.Match(x => x.Winner == searchParams.Winner);
        // }

        // query.PageNumber(searchParams.PageNumber);
        // query.PageSize(searchParams.PageSize);
    }

}