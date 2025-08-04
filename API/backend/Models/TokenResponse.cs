using System.ComponentModel.DataAnnotations.Schema;

public class TokenResponse
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime Expires { get; set; }

    [NotMapped]
    public object User { get; set; } = default!;
}
