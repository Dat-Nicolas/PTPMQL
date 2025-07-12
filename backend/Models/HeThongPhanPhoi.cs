using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace be.Models
{
    public class HeThongPhanPhoi
    {
        [Key]
        public string? MaHTPP { get; set; }

        public string? TenHTPP { get; set; }

        [JsonIgnore]
        public List<Daily>? Dailys { get; set; } 
    }
}
