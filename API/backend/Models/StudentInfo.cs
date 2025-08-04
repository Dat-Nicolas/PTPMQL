using System.ComponentModel.DataAnnotations;
namespace be.Models
{
    public class StudentInfo
    {
        [Key]
        public string? StudentId { get; set; }
        public string? FullName { get; set; }
        public string? Address { get; set; }
    }
}
