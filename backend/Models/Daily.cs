namespace be.Models
{
    public class Daily
    {
        public int Id { get; set; }
        public string? MaDaily { get; set; }
        public string? TenDaily { get; set; }
        public string? DiaChi { get; set; }
        public string? NguoiDaiDien { get; set; }
        public string? DienThoai { get; set; }
        public string? MaHTPP { get; set; }
        public HeThongPhanPhoi? HeThongPhanPhoi { get; set; }
    }
}