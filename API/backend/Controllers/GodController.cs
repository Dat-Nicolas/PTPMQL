using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be.Data;
using be.Models;

namespace PTPMQL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GodController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GodController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/God
        [HttpGet]
        public async Task<ActionResult<IEnumerable<God>>> GetGod()
        {
            return await _context.God.ToListAsync();
        }

        // GET: api/God/5
        [HttpGet("{id}")]
        public async Task<ActionResult<God>> GetGod(string id)
        {
            var god = await _context.God.FindAsync(id);

            if (god == null)
            {
                return NotFound();
            }

            return god;
        }

        // PUT: api/God/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGod(string id, God god)
        {
            if (id != god.Name)
            {
                return BadRequest();
            }

            _context.Entry(god).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GodExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/God
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<God>> PostGod(God god)
        {
            _context.God.Add(god);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GodExists(god.Name))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGod", new { id = god.Name }, god);
        }

        // DELETE: api/God/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGod(string id)
        {
            var god = await _context.God.FindAsync(id);
            if (god == null)
            {
                return NotFound();
            }

            _context.God.Remove(god);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GodExists(string id)
        {
            return _context.God.Any(e => e.Name == id);
        }
    }
}
