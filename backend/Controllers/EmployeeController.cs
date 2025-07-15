using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be.Data;
using be.Models;

namespace be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees);
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee info)
        {
            _context.Employees.Add(info);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = info.Id }, info);
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee info)
        {
            if (id != info.Id)
                return BadRequest(new { message = "ID không khớp" });

            _context.Entry(info).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(info);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Employees.AnyAsync(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa thành công", id });
        }
    }
}
