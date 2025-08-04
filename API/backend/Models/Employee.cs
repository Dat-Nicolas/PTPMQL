using System.ComponentModel.DataAnnotations;
namespace be.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }

        public string Position { get; set; } = string.Empty;
    }
}
