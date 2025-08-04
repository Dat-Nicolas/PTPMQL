using System.ComponentModel.DataAnnotations.Schema;

[NotMapped]
public class UserRoleRequest
{
  public string UserId { get; set; } = string.Empty;
  public List<string> Roles { get; set; } = new();
}
