using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be.Models;
using be.Data;
using be.Utils;
// using Microsoft.AspNetCore.Authorization;

namespace be.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class HeThongPhanPhoiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HeThongPhanPhoiController(AppDbContext context)
        {
            _context = context;
        }

        // Tạo mới dữ liệu



        [HttpPost]
        public async Task<IActionResult> CreateHTPP([FromBody] HeThongPhanPhoi info)
        {
            var lastHTPP = await _context.HeThongPhanPhois.OrderByDescending(p => p.MaHTPP).FirstOrDefaultAsync();
            string lastId = lastHTPP?.MaHTPP;
            var generator = new AutoGenerateCode();
            info.MaHTPP = generator.GenerateCode(lastId, "HTPP");

            _context.HeThongPhanPhois.Add(info);
            await _context.SaveChangesAsync();

            return Ok(info);
        }


        [HttpGet]
        public async Task<IActionResult> GetHeThongPhanPhoi()
        {
            try
            {
                var heThongPhanPhois = await _context.HeThongPhanPhois.ToListAsync();

                if (heThongPhanPhois == null || heThongPhanPhois.Count == 0)
                {
                    return NotFound("Chưa có hệ thống phân phối nào.");
                }

                return Ok(heThongPhanPhois);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server", detail = ex.Message });
            }
        }


        // Cập nhật dữ liệu
        [HttpPut("{maHTPP}")]
        public async Task<IActionResult> UpdateHeThongPhanPhoi(string maHTPP, [FromBody] HeThongPhanPhoi info)
        {
            if (maHTPP != info.MaHTPP)
            {
                return BadRequest(new { message = "Mã hệ thống phân phối không khớp" });
            }

            _context.Entry(info).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.HeThongPhanPhois.Any(e => e.MaHTPP == maHTPP))
                {
                    return NotFound("Không tìm thấy hệ thống phân phối.");
                }
                else
                {
                    throw;
                }
            }

            return Ok(new
            {
                message = "Cập nhật thành công",
                data = info
            });
        }

        // Xóa dữ liệu
        [HttpDelete("{maHTPP}")]
        public async Task<IActionResult> DeleteHeThongPhanPhoi(string maHTPP)
        {
            var entity = await _context.HeThongPhanPhois.FindAsync(maHTPP);
            if (entity == null)
            {
                return NotFound("Không tìm thấy hệ thống phân phối cần xóa.");
            }

            _context.HeThongPhanPhois.Remove(entity);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Xóa thành công",
                maHTPP = maHTPP
            });
        }
    }
}
