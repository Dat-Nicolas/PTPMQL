using System.ComponentModel.DataAnnotations;
namespace be.Models
{
    public class Student
    {
        [Key]
        public string? Id { get; set; } 
        public required string Name { get; set; }

        public int Age { get; set; }
    }
}
