using Food_Delivery_App_Backend.Data;
using Food_Delivery_App_Backend.DTO;
using Food_Delivery_App_Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Food_Delivery_App_Backend.Repository
{
    public class OrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> OrderList(string userId)
        {
            var orderList = await _context.orders.Include(o => o.Restaurent)
                .Include(o => o.MenuItem)
                .Include(o => o.Carts)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.TimeAdded)
                .ToListAsync();

            return orderList;
        }


        public async Task AddOrder(OrderDto orderDto)
        {
            var order = new Order
            {
                UserId = orderDto.UserId,
                RestaurentId = orderDto.RestaurentId,
                MenuItemId = orderDto.MenuItemId,
                Price = orderDto.Price,
                Quantity = orderDto.Quantity,
                FullName = orderDto.FullName,
                Username = orderDto.Username,
                Address = orderDto.Address,
                Email = orderDto.Email,
                PhoneNumber = orderDto.PhoneNumber,
                Pincode = orderDto.Pincode,
                ItemImage = orderDto.ItemImage,
                ItemName = orderDto.ItemName,
                PaymentStatus = "Pending",
                OrderStatus = "Pending",
                TimeAdded = DateTime.Now,
                DeliveryTime = orderDto.DeliveryTime,
            };

            await _context.orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(int orderId)
        {
            var order = await _context.orders.FindAsync(orderId);

            if(order == null)
            {
                throw new Exception("Order not found");
            }

            _context.orders.Remove(order);
            await _context.SaveChangesAsync();
        }

    }
}
