using Food_Delivery_App_Backend.DTO;
using Food_Delivery_App_Backend.Model;
using Food_Delivery_App_Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food_Delivery_App_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderRepository _orderRepository;
        public OrdersController(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrderList(string userId)
        {
            try
            {
                var orderList = await _orderRepository.OrderList(userId);
                if (orderList == null)
                {
                    return BadRequest(new { message = "No orders found" });
                }
                return Ok(orderList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Something went wrong: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddOrder(OrderDto order)
        {
            try
            {
                await _orderRepository.AddOrder(order);
                return Ok(new { message = "Order Added Successfully" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = $"Something went wrong: {ex.Message}" });
            }
        }

        [HttpGet("{orderId}")]

        public async Task<ActionResult> OrderDetails(int orderId)
        {
            try
            {
                var details = await _orderRepository.OrderDetails(orderId);
                if(details == null)
                {
                    return BadRequest(new { message = "No order found" });
                }
                return Ok(details);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = $"Something went wrong: {ex.Message}" });
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteOrder(int orderId)
        {
            try
            {
                await _orderRepository.DeleteOrder(orderId);
                return Ok(new { message = "Order deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Something went wrong: {ex.Message}" });
            }
        }
    }
}
