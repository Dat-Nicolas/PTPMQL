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
    public class DailyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DailyController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDaily([FromBody] Daily info)
        {
            var lastDaily = await _context.Dailies.OrderByDescending(p => p.MaDaily).FirstOrDefaultAsync();
            string lastId = lastDaily?.MaDaily;
            var generator = new AutoGenerateCode();
            info.MaDaily = generator.GenerateCode(lastId, "DL");

            _context.Dailies.Add(info);
            await _context.SaveChangesAsync();

            return Ok(info);
        }

        [HttpGet]
        public async Task<IActionResult> GetDailies()
        {
            var dailies = await _context.Dailies.ToListAsync();
            return Ok(dailies);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDaily(int id, [FromBody] Daily daily)
        {
            if (id != daily.Id)
            {
                return BadRequest("ID không khớp.");
            }

            _context.Entry(daily).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Dailies.Any(e => e.Id == id))
                {
                    return NotFound("Không tìm thấy Daily.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDaily(int id)
        {
            var daily = await _context.Dailies.FindAsync(id);
            if (daily == null)
            {
                return NotFound("Không tìm thấy Daily để xóa.");
            }

            _context.Dailies.Remove(daily);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
