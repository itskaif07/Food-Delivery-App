using Food_Delivery_App_Backend.Model;
using Food_Delivery_App_Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food_Delivery_App_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly RestaurantRepository _repository;

        public RestaurantController(RestaurantRepository restaurantRepository)
        {
            _repository = restaurantRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllRestaurant()
        {
            var repositoryList = await _repository.GetRestaurantList();
            return Ok(repositoryList);
        }

        [HttpPost]
        public async Task<ActionResult> AddRestaurant(Restaurant restaurant)
        {
            if (restaurant == null)
            {
                return BadRequest(new { Message = "Restaurant data is required" });
            }

            try
            {
                await _repository.AddRestaurant(restaurant);

                return Ok(new { Message = "Restaurant added successfully", Data = restaurant });
            }
            catch (ArgumentException ex)
            {
                // Handling specific error for missing ImageUrl or other validation issues
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                // Handling generic errors
                return StatusCode(500, new { Message = "An error occurred while adding the restaurant", Details = ex.Message });
            }
        }


        [HttpPost("UploadImage")]
        public async Task<ActionResult> UploadImage(IFormFile file)
        {
            try
            {
                var imagePath = await _repository.UploadImage(file);

                // Construct the full image URL
                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                var imageUrl = $"{baseUrl}{imagePath}";

                return Ok(new { imageUrl }); 
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> RestaurantDetails(int id)
        {
            var restaurant = await _repository.RestaurantDetails(id);

            if(restaurant == null)
            {
                throw new Exception("Restaurant Not Found");
            }

            return Ok(restaurant);

        }


        [HttpPut("{id}")]
        public async Task<ActionResult> EditRestaurant(int id, [FromBody] Restaurant restaurant)
        {
            await _repository.EditRestaurant(id, restaurant);
            return Ok(restaurant);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRestaurant(int id)
        {
            await _repository.DeleteRestaurant(id);
            return Ok();
        }
    }
}

