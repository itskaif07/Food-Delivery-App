using Food_Delivery_App_Backend.Data;
using Food_Delivery_App_Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Food_Delivery_App_Backend.Repository
{
    public class CartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Cart>> GetCartList(string userId)
        {
            return await _context.carts
                .Include(c => c.MenuItem)
                .Include(c => c.Restaurant)
                .Where(c => c.UserId == userId)
                .OrderByDescending(c => c.TimeAdded)
                .ToListAsync();
        }

        public async Task AddCart(string userId, int restaurentId, int menuItemId, decimal price)
        {

            var changes = _context.ChangeTracker.DebugView.ShortView;
            Console.WriteLine(changes);

            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }

            var menuItem = await _context.menuItems.FindAsync(menuItemId);
            if (menuItem == null)
            {
                throw new ArgumentException("Menu item could not be found.");
            }

            var restaurant = await _context.restaurants.FindAsync(restaurentId);
            if (restaurant == null)
            {
                throw new ArgumentException("Restaurant could not be found.");
            }

            var cart = new Cart()
            {
                UserId = userId,
                RestaurentId = restaurant.RestaurentId,
                MenuItemId = menuItem.MenuId,
                Price = price,
                TimeAdded = DateTime.UtcNow,
                Quantity = 1,
            };

            await _context.carts.AddAsync(cart);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveCart(int cartId)
        {
            var cartItem = await _context.carts.FindAsync(cartId);

            if (cartItem == null)
            {
                throw new Exception("Cart item not found");
            }

            _context.carts.Remove(cartItem);
            await _context.SaveChangesAsync();
        }


        public async Task IncreaseQuantity(int cartId)
        {
            var cartItem = await _context.carts.FindAsync(cartId);

            if (cartItem == null)
            {
                throw new Exception("Cart item not found");
            }

            cartItem.Quantity++;
            _context.carts.Update(cartItem);
            await _context.SaveChangesAsync();
        }

        public async Task DecreaseQuantity(int cartId)
        {
            var cartItem = await _context.carts.FindAsync(cartId);

            if (cartItem == null)
            {
                throw new Exception("Cart item not found");
            }

            if (cartItem.Quantity > 1)
            {
                cartItem.Quantity--;
                _context.carts.Update(cartItem);
            }
            else
            {
                _context.carts.Remove(cartItem);
            }

            await _context.SaveChangesAsync();
        }


    }
}
