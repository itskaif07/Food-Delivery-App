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
            await _repository.AddRestaurant(restaurant);
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
