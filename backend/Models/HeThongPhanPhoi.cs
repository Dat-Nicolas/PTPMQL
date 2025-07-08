namespace be.Models
{
    public class HeThongPhanPhoi
    {
        public string? MaHTPP { get; set; }
        public string? TenHTPP { get; set; }

        public List<Daily>? Dailys { get; set; }
    }
}