using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be.Models;
namespace be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeThongPhanPhoiController : ControllerBase
    {
        // tạo mới dữ liệu
        [HttpPost]
        public IActionResult PostHeThongPhanPhoi([FromBody] HeThongPhanPhoi info)
        {
            return Ok(new
            {
                message = "Dữ liệu đã nhận thành công",
                data = info
            });
        }

        // Lấy dữ liệu từ cơ sở dữ liệu
        [HttpGet]
        public IActionResult GetHeThongPhanPhoi()
        {
            var heThongPhanPhoi = new HeThongPhanPhoi
            {
                MaHTPP = "HTPP001",
                TenHTPP = "Hệ thống phân phối mẫu"
            };

            return Ok(new
            {
                message = "Dữ liệu đã lấy thành công",
                data = heThongPhanPhoi
            });
        }
        // Cập nhật dữ liệu
        [HttpPut("{maHTPP}")]
        public IActionResult UpdateHeThongPhanPhoi(string maHTPP, [FromBody] HeThongPhanPhoi info)
        {
            if (maHTPP != info.MaHTPP)
            {
                return BadRequest(new { message = "Mã hệ thống phân phối không khớp" });
            }


            return Ok(new
            {
                message = "Dữ liệu đã cập nhật thành công",
                data = info
            });
        }
        // Xóa dữ liệu
        [HttpDelete("{maHTPP}")]
        public IActionResult DeleteHeThongPhanPhoi(string maHTPP)
        {

            return Ok(new
            {
                message = "Dữ liệu đã xóa thành công",
                maHTPP = maHTPP
            });
        }
    }

}
