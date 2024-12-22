using System.ComponentModel.DataAnnotations;

namespace Food_Delivery_App_Backend.Model
{
    public class Restaurant
    {
        [Key]
        public int RestaurentId { get; set; }

        public required string Name { get; set; }
        public string? Description { get; set; }

        public required string Address { get; set; }
        
        public required string PhoneNumber { get; set; }

        public string? Email { get; set; }

        public required TimeSpan OpenTime { get; set; } = TimeSpan.FromHours(9);
        public required TimeSpan CloseTime { get; set; } = TimeSpan.FromHours(22);

        public string? ImageUrl { get; set; }

        public string? Category { get; set; }

        public ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();

    }


}
