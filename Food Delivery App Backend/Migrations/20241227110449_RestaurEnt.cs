using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    /// <inheritdoc />
    public partial class RestaurEnt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_menuItems_restaurants_RestaurantId",
                table: "menuItems");

            migrationBuilder.DropIndex(
                name: "IX_menuItems_RestaurantId",
                table: "menuItems");

            migrationBuilder.RenameColumn(
                name: "RestaurantId",
                table: "menuItems",
                newName: "RestaurentId");

            migrationBuilder.AddColumn<int>(
                name: "RestaurantRestaurentId",
                table: "menuItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_menuItems_RestaurantRestaurentId",
                table: "menuItems",
                column: "RestaurantRestaurentId");

            migrationBuilder.AddForeignKey(
                name: "FK_menuItems_restaurants_RestaurantRestaurentId",
                table: "menuItems",
                column: "RestaurantRestaurentId",
                principalTable: "restaurants",
                principalColumn: "RestaurentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_menuItems_restaurants_RestaurantRestaurentId",
                table: "menuItems");

            migrationBuilder.DropIndex(
                name: "IX_menuItems_RestaurantRestaurentId",
                table: "menuItems");

            migrationBuilder.DropColumn(
                name: "RestaurantRestaurentId",
                table: "menuItems");

            migrationBuilder.RenameColumn(
                name: "RestaurentId",
                table: "menuItems",
                newName: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_menuItems_RestaurantId",
                table: "menuItems",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_menuItems_restaurants_RestaurantId",
                table: "menuItems",
                column: "RestaurantId",
                principalTable: "restaurants",
                principalColumn: "RestaurentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
