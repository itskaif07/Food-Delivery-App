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

        public string Category { get; set; }

        public bool isAvailable { get; set; } = false;

        [ForeignKey("RestaurantId")]
        public int RestaurentId { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public Restaurant Restaurant { get; set; }
    }
}
