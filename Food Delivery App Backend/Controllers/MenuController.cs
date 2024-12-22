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

        [HttpGet]
        public async Task<ActionResult> GetmenuList()
        {
            var menuList = await _menuItemsRepository.GetMenuList();
            return Ok(menuList);
        }

        [HttpPost]
        public async Task<ActionResult> AddMenu(MenuItem menuItem)
        {
            await _menuItemsRepository.AddMenu(menuItem);
            return Ok(menuItem);
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
