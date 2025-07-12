using Microsoft.AspNetCore.Mvc;
using be.Models;
using Microsoft.EntityFrameworkCore;
using be.Utils;

namespace be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        [HttpPost]
        public IActionResult PostEmployeeInfo([FromBody] Employee info)
        {
            return Ok(new
            {
                message = "Dữ liệu đã nhận thành công",
                data = info
            });
        }
        [HttpGet]
        public IActionResult GetEmployeeInfo()
        {
            var employee = new Employee
            {
                Id = 1,
                Name = "John Doe",
                Position = "Software Engineer"
            };

            return Ok(new
            {
                message = "Dữ liệu đã lấy thành công",
                data = employee
            });
        }
        [HttpPut("{id}")]
        public IActionResult UpdateEmployeeInfo(int id, [FromBody] Employee info)
        {
            if (id != info.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }


            return Ok(new
            {
                message = "Dữ liệu đã cập nhật thành công",
                data = info
            });
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployeeInfo(int id)
        {

            return Ok(new
            {
                message = "Dữ liệu đã xóa thành công",
                id = id
            });
        }
    
    }
}
