using Food_Delivery_App_Backend.Model;
using Food_Delivery_App_Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food_Delivery_App_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly MenuItemsRepository _menuItemsRepository;

        public MenuController(MenuItemsRepository menuItemsRepository)
        {
            _menuItemsRepository = menuItemsRepository;
        }

        [HttpGet("{restaurentId}")]
        public async Task<ActionResult> GetmenuList(int restaurentId)
        {
            var menuList = await _menuItemsRepository.GetMenuList(restaurentId);
            return Ok(menuList);
        }

        [HttpPost]
        public async Task<ActionResult> AddMenu(MenuItem menuItem)
        {
            try
            {
                await _menuItemsRepository.AddMenu(menuItem);
                return Ok(menuItem);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("UploadImage")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { Message = "No file uploaded." });
                }

                var imagePath = await _menuItemsRepository.UploadImage(file);

                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                var imageUrl = $"{baseUrl}/{imagePath}";
                return Ok(new { imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpGet("menu/{id}")]
        public async Task<ActionResult> MenuDetails(int id)
        {
            var menu = await _menuItemsRepository.MenuDetails(id);

            if (menu == null)
            {
                return BadRequest("Menu Not Found");
            }

            return Ok(menu);
        }

        [HttpGet("MenuListDetails")]
        public async Task<ActionResult> MenuListDetails([FromQuery] int[] menuId)
        {
            try
            {
                var menuList = await _menuItemsRepository.MenuListDetails(menuId);

                if (menuList == null || !menuList.Any())
                {
                    return NotFound("Menu list is empty.");
                }

                return Ok(menuList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }



        [HttpPut("{id}")]
        public async Task<ActionResult> EditMenuItem(int id, [FromBody] MenuItem menuItem)
        {
            await _menuItemsRepository.EditMenu(id, menuItem);
            return Ok(menuItem);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMenuItem(int id)
        {
            await _menuItemsRepository.DeleteMenu(id);
            return Ok();
        }

    }
}
