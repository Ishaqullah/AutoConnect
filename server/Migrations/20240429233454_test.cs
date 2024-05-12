using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "review",
                table: "mechanic_rating");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "mechanic_rating",
                newName: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "mechanic_rating",
                newName: "rating");

            migrationBuilder.AddColumn<string>(
                name: "review",
                table: "mechanic_rating",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
