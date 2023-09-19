# Carsties

Microservices using .NET 8, Next.js, Docker, Kubernetes.

## Few Commands

> 1. Inside `C:\Carsties`

```bash
dotnet new list

dotnet new sln

dotnet new webapi -o src/AuctionService --no-https --use-controllers --use-endpoints

dotnet sln add src/AuctionService

dotnet tool list -g

dotnet tool install dotnet-ef -g

dotnet tool update dotnet-ef -g

dotnet tool update dotnet-ef --prerelease -g

dotnet ef migrations add "InitialCreate" -o Data/Migrations

dotnet ef migrations add "InitialCreate" -o Data/Migrations --project .\src\AuctionService\AuctionService.csproj
```
