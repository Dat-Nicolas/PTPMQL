using System.ComponentModel.DataAnnotations;

namespace be.Models
{
    public class HeThongPhanPhoi
    {
        [Key]
        public string? MaHTPP { get; set; }

        public string? TenHTPP { get; set; }

        public List<Daily>? Dailys { get; set; } // navigation
    }
}
