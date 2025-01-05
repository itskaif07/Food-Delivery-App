using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RestaurentId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MenuItemId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TimeAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RestaurantRestaurentId = table.Column<int>(type: "int", nullable: true),
                    MenuItemMenuId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cart_menuItems_MenuItemMenuId",
                        column: x => x.MenuItemMenuId,
                        principalTable: "menuItems",
                        principalColumn: "MenuId");
                    table.ForeignKey(
                        name: "FK_Cart_restaurants_RestaurantRestaurentId",
                        column: x => x.RestaurantRestaurentId,
                        principalTable: "restaurants",
                        principalColumn: "RestaurentId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_MenuItemMenuId",
                table: "Cart",
                column: "MenuItemMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_RestaurantRestaurentId",
                table: "Cart",
                column: "RestaurantRestaurentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cart");
        }
    }
}
