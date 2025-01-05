using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class OrderModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "carts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RestaurentId = table.Column<int>(type: "int", nullable: false),
                    MenuItemId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TimeAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrderStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Order_menuItems_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "menuItems",
                        principalColumn: "MenuId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_restaurants_RestaurentId",
                        column: x => x.RestaurentId,
                        principalTable: "restaurants",
                        principalColumn: "RestaurentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_carts_OrderId",
                table: "carts",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_MenuItemId",
                table: "Order",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_RestaurentId",
                table: "Order",
                column: "RestaurentId");

            migrationBuilder.AddForeignKey(
                name: "FK_carts_Order_OrderId",
                table: "carts",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_carts_Order_OrderId",
                table: "carts");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropIndex(
                name: "IX_carts_OrderId",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "carts");
        }
    }
}
