using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class CartCheck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carts_menuItems_MenuItemMenuId",
                table: "carts");

            migrationBuilder.DropIndex(
                name: "IX_carts_MenuItemMenuId",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "MenuItemMenuId",
                table: "carts");

            migrationBuilder.AlterColumn<int>(
                name: "RestaurentId",
                table: "carts",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "MenuItemId",
                table: "carts",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_carts_MenuItemId",
                table: "carts",
                column: "MenuItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_carts_menuItems_MenuItemId",
                table: "carts",
                column: "MenuItemId",
                principalTable: "menuItems",
                principalColumn: "MenuId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carts_menuItems_MenuItemId",
                table: "carts");

            migrationBuilder.DropIndex(
                name: "IX_carts_MenuItemId",
                table: "carts");

            migrationBuilder.AlterColumn<string>(
                name: "RestaurentId",
                table: "carts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "MenuItemId",
                table: "carts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "MenuItemMenuId",
                table: "carts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_carts_MenuItemMenuId",
                table: "carts",
                column: "MenuItemMenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_carts_menuItems_MenuItemMenuId",
                table: "carts",
                column: "MenuItemMenuId",
                principalTable: "menuItems",
                principalColumn: "MenuId");
        }
    }
}
