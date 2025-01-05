using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class UserDetailsInOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeliveryDate",
                table: "orders",
                newName: "DeliveryTime");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pincode",
                table: "orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Pincode",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "DeliveryTime",
                table: "orders",
                newName: "DeliveryDate");
        }
    }
}
