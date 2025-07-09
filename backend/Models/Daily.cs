using System.ComponentModel.DataAnnotations.Schema;
using be.Models;
using System.ComponentModel.DataAnnotations;

namespace be.Models
{
    public class Daily
    {
        [Key]
        public int Id { get; set; }
        public string? MaDaily { get; set; }
        public string? TenDaily { get; set; }
        public string? DiaChi { get; set; }
        public string? NguoiDaiDien { get; set; }
        public string? DienThoai { get; set; }

        [ForeignKey("HeThongPhanPhoi")]
        public string? MaHTPP { get; set; } // <-- đây là khóa ngoại rõ ràng

        public HeThongPhanPhoi? HeThongPhanPhoi { get; set; } // navigation
    }
}
