using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be.Migrations
{
    /// <inheritdoc />
    public partial class CreateHeThongPhanPhoiTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dailies_HeThongPhanPhoi_MaHTPP",
                table: "Dailies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HeThongPhanPhoi",
                table: "HeThongPhanPhoi");

            migrationBuilder.RenameTable(
                name: "HeThongPhanPhoi",
                newName: "HeThongPhanPhois");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HeThongPhanPhois",
                table: "HeThongPhanPhois",
                column: "MaHTPP");

            migrationBuilder.AddForeignKey(
                name: "FK_Dailies_HeThongPhanPhois_MaHTPP",
                table: "Dailies",
                column: "MaHTPP",
                principalTable: "HeThongPhanPhois",
                principalColumn: "MaHTPP");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dailies_HeThongPhanPhois_MaHTPP",
                table: "Dailies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HeThongPhanPhois",
                table: "HeThongPhanPhois");

            migrationBuilder.RenameTable(
                name: "HeThongPhanPhois",
                newName: "HeThongPhanPhoi");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HeThongPhanPhoi",
                table: "HeThongPhanPhoi",
                column: "MaHTPP");

            migrationBuilder.AddForeignKey(
                name: "FK_Dailies_HeThongPhanPhoi_MaHTPP",
                table: "Dailies",
                column: "MaHTPP",
                principalTable: "HeThongPhanPhoi",
                principalColumn: "MaHTPP");
        }
    }
}
