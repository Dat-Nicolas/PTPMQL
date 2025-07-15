using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be.Data;

namespace be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("counts")]
        public async Task<IActionResult> GetEntityCounts()
        {
            var result = new
            {
                Persons = await _context.Persons.CountAsync(),
                Students = await _context.Students.CountAsync(),
                Employees = await _context.Employees.CountAsync(),
                Dailys = await _context.Dailies.CountAsync(),
                HeThongPhanPhois = await _context.HeThongPhanPhois.CountAsync()
            };

            return Ok(result);
        }
    }
}
