using Food_Delivery_App_Backend.Data;
using Food_Delivery_App_Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Food_Delivery_App_Backend.Repository
{
    public class HomeRepository
    {
        private readonly AppDbContext _context;
        
        public HomeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<MenuItem>> GetSearchedItems(string searchQuery)
        {
            var searchedItems = await _context.menuItems.Where(m => m.Name.Contains(searchQuery) || (m.Description != null && m.Description.Contains(searchQuery))).ToListAsync();

            return searchedItems;
        }
    }
}
