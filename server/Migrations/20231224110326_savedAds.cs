using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class savedAds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "saved_ads",
                columns: table => new
                {
                    savedAdid = table.Column<int>(name: "savedAd_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    adId = table.Column<int>(name: "ad_Id", type: "integer", nullable: true),
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_saved_ads", x => x.savedAdid);
                    table.ForeignKey(
                        name: "FK_saved_ads_advertise_ad_Id",
                        column: x => x.adId,
                        principalTable: "advertise",
                        principalColumn: "advertise_id");
                    table.ForeignKey(
                        name: "FK_saved_ads_buyer_buyer_id",
                        column: x => x.buyerid,
                        principalTable: "buyer",
                        principalColumn: "buyer_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_saved_ads_ad_Id",
                table: "saved_ads",
                column: "ad_Id");

            migrationBuilder.CreateIndex(
                name: "IX_saved_ads_buyer_id",
                table: "saved_ads",
                column: "buyer_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "saved_ads");
        }
    }
}
