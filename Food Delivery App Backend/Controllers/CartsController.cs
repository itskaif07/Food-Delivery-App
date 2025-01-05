using Food_Delivery_App_Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food_Delivery_App_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly CartRepository _cartRepository;
        public CartsController(CartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult> CartList(string userId)
        {
            try
            {
                var carts = await _cartRepository.GetCartList(userId);
                return Ok(carts);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = $"Invalid input: {ex.Message}" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Something went wrong: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddCart(string userId, int restaurentId, int menuItemId, decimal price)
        {
            try
            {
                await _cartRepository.AddCart(userId, restaurentId, menuItemId, price);
                return Ok(new { message = "Cart added successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = $"Invalid input: {ex.Message}" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Something went wrong: {ex.Message}" });
            }
        }

        [HttpDelete("{cartId}")]
        public async Task<ActionResult> RemoveCart(int cartId)
        {
            try
            {
                await _cartRepository.RemoveCart(cartId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Some Error Occurred: {ex.Message}" });
            }
        }

        [HttpPut("increase/{cartId}")]

        public async Task<ActionResult> IncreaseQuantity(int cartId)
        {
            try
            {
                await _cartRepository.IncreaseQuantity(cartId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Some Error Occured: {ex.Message}" });
            }
        }

        [HttpPut("decrease/{cartId}")]

        public async Task<ActionResult> DecreaseQuantity(int cartId)
        {
            try
            {
                await _cartRepository.DecreaseQuantity(cartId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Some Error Occured: {ex.Message}" });
            }
        }

    }


}

