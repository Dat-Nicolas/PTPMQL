using Microsoft.AspNetCore.Mvc;
using be.Models;
using be.Utils;
// using Microsoft.AspNetCore.Authorization;

namespace be.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SendInfoController : ControllerBase
    {
        
        [HttpPost]
        public IActionResult PostStudentInfo([FromBody] StudentInfo info)
        {
            return Ok(new
            {
                message = "Dữ liệu đã nhận thành công",
                data = info
            });
        }
    }
}
