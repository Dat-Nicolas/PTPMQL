using Microsoft.AspNetCore.Mvc;
using StudentApi.Models;
namespace StudentApi.Controllers
{
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
