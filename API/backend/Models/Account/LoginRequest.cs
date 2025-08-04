namespace be.Models.Account
{
    public class LoginRequest
    {
         public string Email { get; set; } = string.Empty;
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
