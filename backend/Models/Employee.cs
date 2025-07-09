using System.ComponentModel.DataAnnotations;
namespace be.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}
