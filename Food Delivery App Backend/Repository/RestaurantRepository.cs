using Food_Delivery_App_Backend.Data;
using Food_Delivery_App_Backend.Model;
using Microsoft.EntityFrameworkCore;

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
            await _context.restaurants.AddAsync(restaurant);
            await _context.SaveChangesAsync();
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
            restaurant.MenuItems = obj.MenuItems;

            await _context.SaveChangesAsync();

        }

        public async Task DeleteRestaurant(int id)
        {
            var restaurant = await _context.restaurants.FindAsync(id);

            if (restaurant == null)
            {
                throw new Exception("Restaurant not found");
            }

            _context.restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();
        }
    }
}
