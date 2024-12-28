using Food_Delivery_App_Backend.Data;
using Food_Delivery_App_Backend.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Food_Delivery_App_Backend.Repository
{
    public class RestaurantRepository
    {
        private readonly AppDbContext _context;

        public RestaurantRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Restaurant>> GetRestaurantList()
        {
            return await _context.restaurants.ToListAsync();
        }

        public async Task AddRestaurant(Restaurant restaurant)
        {
            if (restaurant == null)
            {
                throw new ArgumentNullException(nameof(restaurant), "Restaurant object cannot be null");
            }

            if (string.IsNullOrEmpty(restaurant.ImageUrl))
            {
                throw new ArgumentException("Image URL is required", nameof(restaurant.ImageUrl));
            }

            try
            {
                await _context.restaurants.AddAsync(restaurant);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while adding restaurant: {ex.Message}", ex);
            }
        }


        public async Task<string> UploadImage(IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                throw new Exception("No File Uploaded");
            }

            //folder path to save the image

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // Create a unique file name

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = $"/images/{fileName}";
            return fileUrl;

        }

        public async Task<Restaurant> RestaurantDetails(int id)
        {
            var restaurent = await _context.restaurants.FindAsync(id);

            if(restaurent == null)
            {
                throw new Exception("Restaurent Not Found");
            }

            return restaurent;
        }

        public async Task EditRestaurant(int id, Restaurant obj)
        {
            var restaurant = await _context.restaurants.FindAsync(id);

            if(restaurant == null)
            {
                throw new Exception("Restaurant not found");
            }

            restaurant.Name = obj.Name;
            restaurant.Email = obj.Email;
            restaurant.Address = obj.Address;
            restaurant.PhoneNumber = obj.PhoneNumber;
            restaurant.Description = obj.Description;
            restaurant.Category = obj.Category;
            restaurant.OpenTime = obj.OpenTime;
            restaurant.CloseTime = obj.CloseTime;
            restaurant.ImageUrl = obj.ImageUrl;
            restaurant.MenuItems = obj.MenuItems;

            await _context.SaveChangesAsync();

        }

        public async Task DeleteRestaurant(int id)
        {
            try
            {
                var restaurant = await _context.restaurants.FindAsync(id);
                if (restaurant == null)
                {
                    throw new Exception("Restaurant not found");
                }
                _context.restaurants.Remove(restaurant);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception for further debugging
                throw new Exception("An error occurred while deleting the restaurant", ex);
            }
        }

    }
}
