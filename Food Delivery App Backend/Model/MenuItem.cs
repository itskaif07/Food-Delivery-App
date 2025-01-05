using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Food_Delivery_App_Backend.Model
{
    public class MenuItem
    {
        [Key]
        public int MenuId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }

        public int Discount { get; set; } = 0;

        public decimal DiscountedPrice => Discount > 0 ? Price - (Price * Discount)/100 : Price;

        public string Category { get; set; }

        public bool isAvailable { get; set; } = false;

        [ForeignKey("RestaurantId")]
        public int RestaurentId { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public Restaurant Restaurant { get; set; }

        public ICollection<Cart>? Carts { get; set; }

        public ICollection<Order>? Orders { get; set; }
    }
}
