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

        public async Task<List<MenuItem>> GetMenuList()
        {
            return await _context.menuItems.ToListAsync();
        }

        public async Task AddMenu(MenuItem menuItem)
        {
            await _context.menuItems.AddAsync(menuItem);
            await _context.SaveChangesAsync();
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
