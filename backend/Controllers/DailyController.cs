using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be.Models;
using be.Data;
namespace be.Controllers
{
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
        public async Task<IActionResult> CreateDaily([FromBody] Daily daily)
        {
            if (daily == null)
            {
                return BadRequest("Invalid daily data.");
            }

            _context.Dailies.Add(daily);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDailies), new { id = daily.Id }, daily);
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
                return BadRequest("Daily ID mismatch.");
            }

            _context.Entry(daily).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDaily(int id)
        {
            var daily = await _context.Dailies.FindAsync(id);
            if (daily == null)
            {
                return NotFound("Daily not found.");
            }

            _context.Dailies.Remove(daily);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}