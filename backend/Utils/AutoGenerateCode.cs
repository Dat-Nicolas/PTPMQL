namespace be.Utils
{
    public class AutoGenerateCode
    {
        public string GenerateCode(string? lastId, string prefix, int numberLength = 3)
        {
            if (string.IsNullOrWhiteSpace(lastId) || !lastId.StartsWith(prefix))
            {
                return prefix + "001";
            }

            var numberPart = lastId.Substring(prefix.Length);

            if (!int.TryParse(numberPart, out int number))
            {
                return prefix + "001";
            }

            number += 1;
            return prefix + number.ToString($"D{numberLength}");
        }
    }
}
