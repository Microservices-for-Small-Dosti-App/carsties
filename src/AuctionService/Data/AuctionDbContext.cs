﻿using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class AuctionDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Auction> Auctions => Set<Auction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // modelBuilder.AddInboxStateEntity();
        // modelBuilder.AddOutboxMessageEntity();
        // modelBuilder.AddOutboxStateEntity();
    }
}