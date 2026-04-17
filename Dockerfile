FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /app
COPY server/*.csproj ./server/
RUN dotnet restore ./server/CarbCompass.csproj
COPY server/ ./server/
RUN dotnet publish ./server/CarbCompass.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "CarbCompass.dll"]
