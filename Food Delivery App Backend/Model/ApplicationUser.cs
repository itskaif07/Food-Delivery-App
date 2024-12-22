using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Food_Delivery_App_Backend.Model
{
    public class ApplicationUser : IdentityUser
    {
        [Key]
        public string UserId { get; set; }

        public string? Name { get; set; }

        public required string Address { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string PostalCode { get; set; }

        public DateTime DateJoined { get; set; } = DateTime.Now;

    }
}
