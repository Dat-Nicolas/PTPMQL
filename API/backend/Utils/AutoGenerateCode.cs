using System.Text.RegularExpressions;
namespace be.Utils
{
    public class AutoGenerateCode
    {
        public string GenerateCode(string? lastId, string prefix = "ST", int numberLength = 3)
        {
            if (string.IsNullOrWhiteSpace(lastId) || !lastId.StartsWith(prefix))
            {
                return prefix + "001";
            }

            var match = Regex.Match(lastId, @"^(?<prefix>[A-Za-z]+)(?<number>\d+)$");
            if (!match.Success)
            {
                return prefix + "001";
            }

            string numberPart = match.Groups["number"].Value;
            int number = int.Parse(numberPart) + 1;
            string newNumberPart = number.ToString().PadLeft(numberLength, '0');

            return prefix + newNumberPart;
        }
    }
}
