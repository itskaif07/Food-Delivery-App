using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class ItemName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "orders");
        }
    }
}
