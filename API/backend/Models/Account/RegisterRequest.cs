using System.ComponentModel.DataAnnotations;
namespace be.Models.Account;

public class RegisterRequest
{
    [Display(Name = "Tên của bạn")]
    public string UserName { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    [Display(Name = "Email")]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = string.Empty;
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;
    [Required]
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Mật khẩu xác nhận không khớp")]
    [Display(Name = "Xác nhận mật khẩu")]
    public string ConfirmPassword { get; set; } = string.Empty;
}
