using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Food_Delivery_App_Backend.Model
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public string UserId { get; set; }
        public int RestaurentId { get; set; }
        public int MenuItemId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice => Quantity * Price;
        public DateTime TimeAdded { get; set; } = DateTime.UtcNow;

        public string OrderStatus { get; set; } = "Pending";

        public string PaymentStatus { get; set; } = "Pending";

        public string? FullName { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string? Email { get; set; }
        public string PhoneNumber { get; set; }
        public string? ItemImage { get; set; }
        public string? ItemName { get; set; }

        public DateTime DeliveryTime { get; set; }
        public ICollection<Cart> Carts { get; set; } = new List<Cart>();

        [ValidateNever]
        [JsonIgnore]
        public Restaurant? Restaurent { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public MenuItem?  MenuItem { get; set; }

    }
}
