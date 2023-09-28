# Carsties

Microservices using .NET 8, Next.js, Docker, Kubernetes.

## Few Commands

> 1. Inside `C:\Carsties`

```bash
dotnet watch
```

## Auction Service

```bash
dotnet new list

dotnet new sln

dotnet new webapi -o src/AuctionService --no-https --use-controllers --use-endpoints --dry-run

dotnet sln add src/AuctionService

dotnet tool list -g

dotnet tool install dotnet-ef -g

dotnet tool update dotnet-ef -g

dotnet tool update dotnet-ef --prerelease -g

dotnet ef migrations add "InitialCreate" -o Data/Migrations

dotnet ef migrations add "InitialCreate" -o Data/Migrations --project .\src\AuctionService\AuctionService.csproj

docker compose up -d

dotnet ef database update
```

## Search Service

```bash
dotnet new webapi -o src/SearchService --no-https --use-controllers --use-endpoints --dry-run

dotnet sln add src/SearchService

docker-compose up -d
```
