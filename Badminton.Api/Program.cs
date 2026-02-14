using System.ComponentModel.DataAnnotations;
using Badminton.Core;
using ILogger = Microsoft.Extensions.Logging.ILogger;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddValidation();
builder.Services.AddCors(options =>
    {
        options.AddPolicy(
            name: myAllowSpecificOrigins,
            policy => { policy.WithOrigins($"{builder.Configuration.GetValue("UI_URL", "http://localhost:4200")}"); }
        );
    }
);
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors(myAllowSpecificOrigins);

app.MapGet(
    "/api/",
    (
        [Required] string[] names,
        [Required] [Range(1, 10)] int minGames,
        [Required] [Range(1, 10)] int courtCount
    ) => new MatchupBuilder().GetMatchups(names, minGames, courtCount)
);

var logger = app.Logger;
var keyValuePairs = app.Configuration.AsEnumerable();
var url = builder.Configuration.GetValue("UI_URL", "http://localhost:4200");
logger.LogInformation(url);

app.Run();