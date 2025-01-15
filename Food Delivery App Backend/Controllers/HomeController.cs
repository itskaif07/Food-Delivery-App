using Food_Delivery_App_Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food_Delivery_App_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly HomeRepository _homeRepository;
        public HomeController(HomeRepository homeRepository)
        {
            _homeRepository = homeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetSearchedItems(string searchQuery)
        {
            try
            {
                var searchedItems = await _homeRepository.GetSearchedItems(searchQuery);
                return Ok(searchedItems);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Something went wrong: {ex.Message}" });
            }
        }
    }
}
