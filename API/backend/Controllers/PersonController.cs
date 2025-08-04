using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using be.Models;
using be.Data;
using be.Utils;
// using Microsoft.AspNetCore.Authorization;

namespace be.Controllers
{
    // [Authorize]
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

        [HttpGet]
        public async Task<ActionResult> GetPersons(int page = 1, int pageSize = 10)
        {
            if (page < 1 || pageSize < 1)
                return BadRequest("Page và PageSize phải lớn hơn 0 hoặc không có dữ liệu");

            var totalItems = await _context.Persons.CountAsync();

            var persons = await _context.Persons
                .OrderBy(p => p.PersonId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                TotalItems = totalItems,
                PageNumber = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                Data = persons
            });
        }


        [HttpGet("next-id")]
        public async Task<ActionResult<string>> GetNextPersonId()
        {
            var lastPerson = await _context.Persons.OrderByDescending(p => p.PersonId).FirstOrDefaultAsync();
            string nextId = "PS001";
            if (lastPerson != null)
            {
                string lastId = lastPerson.PersonId.Replace("PS", "");
                int number = int.Parse(lastId) + 1;
                nextId = "PS" + number.ToString("D3");
            }
            return Ok(nextId);
        }

        [HttpGet("{PersonId}")]
        public async Task<ActionResult<Person>> GetPerson(string PersonId)
        {
            var person = await _context.Persons.FindAsync(PersonId);
            if (person == null) return NotFound();
            return Ok(person);
        }

        [HttpPut("{PersonId}")]
        public async Task<IActionResult> PutPerson(string PersonId, Person person)
        {
            if (PersonId != person.PersonId) return BadRequest();
            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Persons.Any(e => e.PersonId == PersonId))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{PersonId}")]
        public async Task<IActionResult> DeletePerson(string PersonId)
        {
            var person = await _context.Persons.FindAsync(PersonId);
            if (person == null) return NotFound();
            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportExcel()
        {
            // chứng nhận thư viện để dùng export
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var persons = await _context.Persons.ToListAsync();
            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Persons");

            worksheet.Cells[1, 1].Value = "PersonId";
            worksheet.Cells[1, 2].Value = "FullName";
            worksheet.Cells[1, 3].Value = "Address";

            for (int i = 0; i < persons.Count; i++)
            {
                worksheet.Cells[i + 2, 1].Value = persons[i].PersonId;
                worksheet.Cells[i + 2, 2].Value = persons[i].FullName;
                worksheet.Cells[i + 2, 3].Value = persons[i].Address;
            }

            var stream = new MemoryStream(package.GetAsByteArray());
            stream.Position = 0;

            return File(stream,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "persons.xlsx");
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportExcel(IFormFile file)
        {
            // chứng nhận thư viện để dùng import
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            
            if (file == null || file.Length <= 0)
                return BadRequest("File không hợp lệ");
                
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];

            if (worksheet.Dimension == null)
                return BadRequest("Không tìm thấy dữ liệu trong file Excel");

            int rowCount = worksheet.Dimension.Rows;

            // Lấy danh sách PersonId đã tồn tại
            var existingIds = await _context.Persons
                .Select(p => p.PersonId)
                .ToListAsync();

            string lastId = existingIds
                .Where(id => id.StartsWith("PS"))
                .OrderByDescending(id => id)
                .FirstOrDefault();

            var generator = new AutoGenerateCode();
            var newPersons = new List<Person>();

            for (int row = 2; row <= rowCount; row++)
            {
                string excelId = worksheet.Cells[row, 1].Text?.Trim();
                string fullName = worksheet.Cells[row, 2].Text?.Trim();
                string address = worksheet.Cells[row, 3].Text?.Trim();

                // Nếu ID trống hoặc đã tồn tại => sinh ID mới
                string finalId = string.IsNullOrWhiteSpace(excelId) || existingIds.Contains(excelId)
                    ? generator.GenerateCode(lastId, "PS")
                    : excelId;

                // Cập nhật lastId để không bị trùng ID khi sinh
                lastId = finalId;
                existingIds.Add(finalId); // để tránh sinh lại ID trùng trong file Excel

                var person = new Person
                {
                    PersonId = finalId,
                    FullName = fullName,
                    Address = address
                };

                newPersons.Add(person);
            }

            _context.Persons.AddRange(newPersons);
            await _context.SaveChangesAsync();

            return Ok($"Đã import {newPersons.Count} người (ID được sinh tự động nếu trùng hoặc để trống)");
        }
    }
}