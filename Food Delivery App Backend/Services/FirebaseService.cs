using FirebaseAdmin.Auth;

namespace Food_Delivery_App_Backend.Services
{
    public class FirebaseService
    {
        public async Task AssignAdminRole(string email)
        {
            var user = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(email);

            var claims = new Dictionary<string, object>
            {
                { "admin", true }
            };

            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(user.Uid, claims);
        }
    }
}
