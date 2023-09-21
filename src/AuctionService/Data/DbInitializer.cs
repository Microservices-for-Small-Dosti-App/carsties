

using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public static class DbInitializer
{
    public static void Initialize(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        SeedData(scope.ServiceProvider.GetService<AuctionDbContext>());
    }

    private static void SeedData(AuctionDbContext? auctionDbContext)
    {
        auctionDbContext?.Database.Migrate();

        if (auctionDbContext!.Auctions.Any())
        {
            Console.WriteLine("Already have data - no need to seed");
            return;
        }
        List<Auction> auctions = GetInitialAuctions();

        auctionDbContext.AddRange(auctions);

        auctionDbContext.SaveChanges();
    }

    private static List<Auction> GetInitialAuctions()
    {
        List<Auction> auctions =
        [
            // 1 Ford GT
            new Auction
            {
                Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
                Status = Status.Live,
                ReservePrice = 20000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(10),
                Item = new Item
                {
                    Make = "Ford",
                    Model = "GT",
                    Color = "White",
                    Mileage = 50000,
                    Year = 2020,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/05/06/16/32/car-1376190_960_720.jpg"
                }
            },
        ];
        return auctions;
    }
}
