using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class test2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "mechanic_rating",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_mechanic_rating_user_id",
                table: "mechanic_rating",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_mechanic_rating_user_main_user_id",
                table: "mechanic_rating",
                column: "user_id",
                principalTable: "user_main",
                principalColumn: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_mechanic_rating_user_main_user_id",
                table: "mechanic_rating");

            migrationBuilder.DropIndex(
                name: "IX_mechanic_rating_user_id",
                table: "mechanic_rating");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "mechanic_rating",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }
    }
}
