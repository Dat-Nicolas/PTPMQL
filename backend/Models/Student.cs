using System.ComponentModel.DataAnnotations;
namespace be.Models
{
    public class Student
    {
        [Key]
        public string? Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
