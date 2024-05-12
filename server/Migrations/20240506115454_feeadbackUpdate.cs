using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class feeadbackUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_feedback_buyer_buyer_id",
                table: "feedback");

            migrationBuilder.DropForeignKey(
                name: "FK_feedback_seller_seller_id",
                table: "feedback");

            migrationBuilder.DropIndex(
                name: "IX_feedback_buyer_id",
                table: "feedback");

            migrationBuilder.DropColumn(
                name: "buyer_id",
                table: "feedback");

            migrationBuilder.RenameColumn(
                name: "seller_id",
                table: "feedback",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_feedback_seller_id",
                table: "feedback",
                newName: "IX_feedback_user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_feedback_user_main_user_id",
                table: "feedback",
                column: "user_id",
                principalTable: "user_main",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_feedback_user_main_user_id",
                table: "feedback");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "feedback",
                newName: "seller_id");

            migrationBuilder.RenameIndex(
                name: "IX_feedback_user_id",
                table: "feedback",
                newName: "IX_feedback_seller_id");

            migrationBuilder.AddColumn<int>(
                name: "buyer_id",
                table: "feedback",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_feedback_buyer_id",
                table: "feedback",
                column: "buyer_id");

            migrationBuilder.AddForeignKey(
                name: "FK_feedback_buyer_buyer_id",
                table: "feedback",
                column: "buyer_id",
                principalTable: "buyer",
                principalColumn: "buyer_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_feedback_seller_seller_id",
                table: "feedback",
                column: "seller_id",
                principalTable: "seller",
                principalColumn: "seller_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
