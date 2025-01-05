using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class orderImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ItemImage",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemImage",
                table: "orders");
        }
    }
}
