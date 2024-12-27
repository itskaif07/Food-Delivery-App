using Food_Delivery_App_Backend.Data;
using Food_Delivery_App_Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Food_Delivery_App_Backend.Repository
{
    public class MenuItemsRepository
    {
        private readonly AppDbContext _context;

        public MenuItemsRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<MenuItem>> GetMenuList(int restaurentId)
        {
            return await _context.menuItems.Where(m => m.RestaurentId == restaurentId).ToListAsync();
        }

        public async Task AddMenu(MenuItem menuItem)
        {

            // Check if the RestaurantId exists in the restaurants table
            var restaurant = await _context.restaurants.FirstOrDefaultAsync(r => r.RestaurentId == menuItem.RestaurentId);

            if (restaurant == null)
            {
                throw new Exception("Invalid RestaurantId: The specified restaurant does not exist.");
            }

            await _context.menuItems.AddAsync(menuItem);
            await _context.SaveChangesAsync();
        }

        public async Task<string> UploadImage(IFormFile file)
        {
            var uplaoadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uplaoadFolder))
            {
                Directory.CreateDirectory(uplaoadFolder);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uplaoadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
               await file.CopyToAsync(stream);
            }

            var imageUrl = $"/images/{fileName}";

            return imageUrl;
        }


        public async Task EditMenu(int id, MenuItem obj)
        {
            var menu = await _context.menuItems.FindAsync(id);

            if (menu == null)
            {
                throw new Exception("Menu not found");
            }

            menu.Name = obj.Name;
            menu.Description = obj.Description;
            menu.Price = obj.Price;
            menu.ImageUrl = obj.ImageUrl;
            menu.Category = obj.Category;
            menu.isAvailable = obj.isAvailable;

            await _context.SaveChangesAsync();

        }

        public async Task DeleteMenu(int id)
        {
            var menu = await _context.menuItems.FindAsync(id);

            if (menu == null)
            {
                throw new Exception("Menu not found");
            }

            _context.menuItems.Remove(menu);
            await _context.SaveChangesAsync();
        }
    }
}
