namespace Food_Delivery_App_Backend.DTO
{
    public class OrderDto
    {
        public string UserId { get; set; }
        public int RestaurentId { get; set; }
        public int MenuItemId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? ItemImage { get; set; }
        public string? ItemName { get; set; }
        public string? FullName { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string? Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DeliveryTime { get; set; }
    }
}
