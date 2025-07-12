using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be.Models;
using be.Data;
using be.Utils;


namespace be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreatePerson([FromBody] Person info)
        {
            var lastPerson = await _context.Persons.OrderByDescending(p => p.PersonId).FirstOrDefaultAsync();
            string lastId = lastPerson?.PersonId;
            var generator = new AutoGenerateCode();
            info.PersonId = generator.GenerateCode(lastId, "PS");

            _context.Persons.Add(info);
            await _context.SaveChangesAsync();

            return Ok(info);
        }

        // GET: api/Persons  lấy danh sách Person
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            if (_context.Persons == null)
            {
                return NotFound("Bảng Person chưa được khởi tạo.");
            }

            var persons = await _context.Persons.ToListAsync();

            if (persons == null || persons.Count == 0)
            {
                return NotFound("Chưa có người dùng nào.");
            }

            return Ok(persons);
        }

        [HttpGet("next-id")]
        public async Task<ActionResult<string>> GetNextPersonId()
        {
            var lastPerson = await _context.Persons
                .OrderByDescending(p => p.PersonId)
                .FirstOrDefaultAsync();

            string nextId = "PS001";

            if (lastPerson != null)
            {
                string lastId = lastPerson.PersonId.Replace("PS", "");
                int number = int.Parse(lastId) + 1;
                nextId = "PS" + number.ToString("D3");
            }

            return Ok(nextId);
        }



        // GET: api/Persons/5 lấy thông tin Person theo PersonId
        [HttpGet("{PersonId}")]
        public async Task<ActionResult<Person>> GetPerson(string PersonId)
        {
            var Person = await _context.Persons.FindAsync(PersonId);

            if (Person == null)
            {
                return NotFound();
            }

            return Person;
        }



        // PUT: api/Persons/5 cập nhật thông tin Person
        [HttpPut("{PersonId}")]
        public async Task<IActionResult> PutPerson(string PersonId, Person Person)
        {
            if (PersonId != Person.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(Person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(PersonId))
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

        // DELETE: api/Persons/5 xóa Person theo PersonId
        [HttpDelete("{PersonId}")]
        public async Task<IActionResult> DeletePerson(string PersonId)
        {
            var Person = await _context.Persons.FindAsync(PersonId);
            if (Person == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(Person);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonExists(string PersonId)
        {
            return _context.Persons.Any(e => e.PersonId == PersonId);
        }
    }
}
