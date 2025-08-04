using System.ComponentModel.DataAnnotations;

namespace be.Models
{
    public class God
    {
        [Key]
        [Required(ErrorMessage = "Tên không được để trống.")]
        [StringLength(100, ErrorMessage = "Tên không được vượt quá 100 ký tự.")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Tên chỉ được chứa chữ cái, dấu cách và gạch dưới.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Tuổi không được để trống.")]
        [Range(0, 1000, ErrorMessage = "Tuổi phải từ 0 đến 1000.")]
        public int Age { get; set; }

    }
}
