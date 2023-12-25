# Carsties

Microservices using .NET 8, Next.js, Docker, Kubernetes.

## Few Commands

> 1. Inside `C:\Carsties`

```bash
dotnet watch
```

## Docker Compose

```bash
docker compose build auction-svc
docker compose up -d
docker compose down

docker compose build search-svc
docker compose up -d
docker compose down

```

## Gateway

```bash
dotnet new web -o src/GatewayService --dry-run
```

## Identity Service

```bash
dotnet new --install Duende.IdentityServer.Templates

dotnet new isaspid -n IdentityService -o src/IdentityService

dotnet sln add .\src\IdentityService\

dotnet tool update dotnet-ef --prerelease -g

C:\GitHub\carsties\src\IdentityService> dotnet ef migrations add "InitialCreate" -o Data/Migrations
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

dotnet ef migrations add "OutBoxV1" -o Data/Migrations --project .\src\AuctionService\AuctionService.csproj

dotnet ef database update
```

## Search Service

```bash
dotnet new webapi -o src/SearchService --no-https --use-controllers --use-endpoints --dry-run

dotnet sln add src/SearchService

docker-compose up -d
```

## Contracts

```bash
dotnet new classlib -o src/Contracts --dry-run

dotnet sln add src/Contracts
```

## Few Commands V1

```bash
dotnet add reference ../Contracts/Contracts.csproj
```
