﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public string Category { get; set; } //(e.g., Appetizer, Main Course, Dessert

        public bool isAvailable { get; set; } = false;

        [ForeignKey("RestaurantId")]
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}
