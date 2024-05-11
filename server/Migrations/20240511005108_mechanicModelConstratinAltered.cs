using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class mechanicModelConstratinAltered : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_mechanic_rating_user_main_user_id",
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

            migrationBuilder.AddForeignKey(
                name: "FK_mechanic_rating_user_main_user_id",
                table: "mechanic_rating",
                column: "user_id",
                principalTable: "user_main",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_mechanic_rating_user_main_user_id",
                table: "mechanic_rating");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "mechanic_rating",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_mechanic_rating_user_main_user_id",
                table: "mechanic_rating",
                column: "user_id",
                principalTable: "user_main",
                principalColumn: "user_id");
        }
    }
}
