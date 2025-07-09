namespace be.Models
{
    public class AutoGenerateCode
    {
        public string GenerateCode(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return "PS001";
            }

            // 1. Tách phần chữ "PS" (2 ký tự đầu)
            string MaDau = id.Substring(0, 2);

            // 2. Lấy phần số
            string laySo = id.Substring(2);

            // 3. Chuyển sang số nguyên và tăng lên
            int number = int.Parse(laySo) + 1;

            // 4. Ghép lại mã mới
            string newCode = MaDau + number.ToString("D3");

            return newCode;
        }
    }
}