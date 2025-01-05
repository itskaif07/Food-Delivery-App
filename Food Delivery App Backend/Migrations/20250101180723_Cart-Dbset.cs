using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class CartDbset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_menuItems_MenuItemMenuId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Cart_restaurants_RestaurantRestaurentId",
                table: "Cart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cart",
                table: "Cart");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "carts");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_RestaurantRestaurentId",
                table: "carts",
                newName: "IX_carts_RestaurantRestaurentId");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_MenuItemMenuId",
                table: "carts",
                newName: "IX_carts_MenuItemMenuId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_carts",
                table: "carts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_carts_menuItems_MenuItemMenuId",
                table: "carts",
                column: "MenuItemMenuId",
                principalTable: "menuItems",
                principalColumn: "MenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_carts_restaurants_RestaurantRestaurentId",
                table: "carts",
                column: "RestaurantRestaurentId",
                principalTable: "restaurants",
                principalColumn: "RestaurentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carts_menuItems_MenuItemMenuId",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "FK_carts_restaurants_RestaurantRestaurentId",
                table: "carts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_carts",
                table: "carts");

            migrationBuilder.RenameTable(
                name: "carts",
                newName: "Cart");

            migrationBuilder.RenameIndex(
                name: "IX_carts_RestaurantRestaurentId",
                table: "Cart",
                newName: "IX_Cart_RestaurantRestaurentId");

            migrationBuilder.RenameIndex(
                name: "IX_carts_MenuItemMenuId",
                table: "Cart",
                newName: "IX_Cart_MenuItemMenuId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cart",
                table: "Cart",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_menuItems_MenuItemMenuId",
                table: "Cart",
                column: "MenuItemMenuId",
                principalTable: "menuItems",
                principalColumn: "MenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_restaurants_RestaurantRestaurentId",
                table: "Cart",
                column: "RestaurantRestaurentId",
                principalTable: "restaurants",
                principalColumn: "RestaurentId");
        }
    }
}
