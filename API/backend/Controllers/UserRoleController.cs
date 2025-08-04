using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using be.Models;
using Microsoft.AspNetCore.Authorization;
namespace be.Controllers;
[Authorize(Roles = "ADMIN")]
[ApiController]
[Route("api/[controller]")]
public class UserRoleController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRoleController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllUsersWithRoles()
    {
        var users = _userManager.Users.ToList();

        var result = new List<object>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            result.Add(new
            {
                user.Id,
                user.UserName,
                user.Email,
                Roles = roles
            });
        }

        return Ok(result);
        // return Ok(new {Message="Danh sách roles"},result);

    }


    [HttpGet("GetRolesForUser/{userId}")]
    public async Task<IActionResult> GetRolesForUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("User not found.");

        var roles = await _userManager.GetRolesAsync(user);
        return Ok(roles);
    }

    [HttpPost("AddRolesToUser")]
    public async Task<IActionResult> AddRolesToUser([FromBody] UserRoleRequest model)
    {
        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null) return NotFound("User not found.");

        var result = await _userManager.AddToRolesAsync(user, model.Roles);
        return result.Succeeded ? Ok("Roles added successfully.") : BadRequest(result.Errors);
    }

    [HttpPut("{userId}")]
    public async Task<IActionResult> UpdateUserRoles(string userId, [FromBody] UserRoleRequest model)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("User not found.");

        var currentRoles = await _userManager.GetRolesAsync(user);

        // Xóa tất cả role cũ
        var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
        if (!removeResult.Succeeded) return BadRequest(removeResult.Errors);

        // Thêm role mới
        var addResult = await _userManager.AddToRolesAsync(user, model.Roles);
        return addResult.Succeeded ? Ok("Roles updated.") : BadRequest(addResult.Errors);
    }
    [HttpDelete("{userId}")]
    public async Task<IActionResult> RemoveUserRoles(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("User not found.");

        var roles = await _userManager.GetRolesAsync(user);
        var result = await _userManager.RemoveFromRolesAsync(user, roles);

        return result.Succeeded ? Ok("All roles removed.") : BadRequest(result.Errors);
    }


}

