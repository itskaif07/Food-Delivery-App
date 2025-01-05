using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Food_Delivery_App_Backend.Model
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int RestaurentId { get; set; }
        public int MenuItemId { get; set; }
        public int Quantity { get; set; } = 1;
        public decimal Price { get; set; }
        public decimal TotalPrice => Price * Quantity;
        public DateTime TimeAdded { get; set; } = DateTime.UtcNow;
        public int? OrderId { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public Order? Order { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public Restaurant? Restaurant { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public MenuItem? MenuItem { get; set; }
    }
}
