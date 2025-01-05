using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class DbsetOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carts_Order_OrderId",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_menuItems_MenuItemId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_restaurants_RestaurentId",
                table: "Order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "orders");

            migrationBuilder.RenameIndex(
                name: "IX_Order_RestaurentId",
                table: "orders",
                newName: "IX_orders_RestaurentId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_MenuItemId",
                table: "orders",
                newName: "IX_orders_MenuItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orders",
                table: "orders",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_carts_orders_OrderId",
                table: "carts",
                column: "OrderId",
                principalTable: "orders",
                principalColumn: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_menuItems_MenuItemId",
                table: "orders",
                column: "MenuItemId",
                principalTable: "menuItems",
                principalColumn: "MenuId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_restaurants_RestaurentId",
                table: "orders",
                column: "RestaurentId",
                principalTable: "restaurants",
                principalColumn: "RestaurentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carts_orders_OrderId",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_menuItems_MenuItemId",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_restaurants_RestaurentId",
                table: "orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orders",
                table: "orders");

            migrationBuilder.RenameTable(
                name: "orders",
                newName: "Order");

            migrationBuilder.RenameIndex(
                name: "IX_orders_RestaurentId",
                table: "Order",
                newName: "IX_Order_RestaurentId");

            migrationBuilder.RenameIndex(
                name: "IX_orders_MenuItemId",
                table: "Order",
                newName: "IX_Order_MenuItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_carts_Order_OrderId",
                table: "carts",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_menuItems_MenuItemId",
                table: "Order",
                column: "MenuItemId",
                principalTable: "menuItems",
                principalColumn: "MenuId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_restaurants_RestaurentId",
                table: "Order",
                column: "RestaurentId",
                principalTable: "restaurants",
                principalColumn: "RestaurentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
