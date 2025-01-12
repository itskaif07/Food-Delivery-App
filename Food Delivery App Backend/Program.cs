using Food_Delivery_App_Backend.Data;
using Food_Delivery_App_Backend.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Food_Delivery_App_Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.WithOrigins("http://localhost:4200")  
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddScoped<RestaurantRepository>();
builder.Services.AddScoped<MenuItemsRepository>();
builder.Services.AddScoped<FirebaseService>();
builder.Services.AddScoped<CartRepository>();
builder.Services.AddScoped<OrderRepository>();

var host = WebApplication.CreateBuilder(args);

// Bind server to listen on all network interfaces (0.0.0.0)
host.WebHost.UseUrls("http://0.0.0.0:7205");


// Admin Role
if (FirebaseApp.DefaultInstance == null)
{
    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile(@"key/sample-firebase-ai-app-7b76d-firebase-adminsdk-ovvts-c1eefe9e32.json")
    });
}



var app = builder.Build();

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseCors("AllowSpecificOrigin");


using (var scope = app.Services.CreateScope())
{
    var firebaseService = scope.ServiceProvider.GetRequiredService<FirebaseService>();
    await firebaseService.AssignAdminRole("kaifk8402@gmail.com");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

