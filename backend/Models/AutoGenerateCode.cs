namespace be.Models
{
    public class AutoGenerateCode
    {
        public string GenerateCode(string? id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return "PS001";
            }

            if (id.Length < 3 || !int.TryParse(id.Substring(2), out int number))
            {
                return "PS001"; // fallback an toàn
            }

            // Tăng số lên và tạo mã mới
            number += 1;
            return "PS" + number.ToString("D3");
        }
    }
}
