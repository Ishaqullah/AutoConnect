using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class appointmentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "inspection");

            migrationBuilder.AlterColumn<string>(
                name: "mechanic_phone",
                table: "mechanic",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "mechanic_address",
                table: "mechanic",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateTable(
                name: "appointment",
                columns: table => new
                {
                    appointmentid = table.Column<int>(name: "appointment_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    status = table.Column<string>(type: "text", nullable: false),
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false),
                    mechanicid = table.Column<int>(name: "mechanic_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointment", x => x.appointmentid);
                    table.ForeignKey(
                        name: "FK_appointment_buyer_buyer_id",
                        column: x => x.buyerid,
                        principalTable: "buyer",
                        principalColumn: "buyer_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_appointment_mechanic_mechanic_id",
                        column: x => x.mechanicid,
                        principalTable: "mechanic",
                        principalColumn: "mechanic_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_appointment_buyer_id",
                table: "appointment",
                column: "buyer_id");

            migrationBuilder.CreateIndex(
                name: "IX_appointment_mechanic_id",
                table: "appointment",
                column: "mechanic_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "appointment");

            migrationBuilder.AlterColumn<string>(
                name: "mechanic_phone",
                table: "mechanic",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "mechanic_address",
                table: "mechanic",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "inspection",
                columns: table => new
                {
                    inspectionid = table.Column<int>(name: "inspection_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false),
                    mechanicid = table.Column<int>(name: "mechanic_id", type: "integer", nullable: false),
                    vehicleid = table.Column<int>(name: "vehicle_id", type: "integer", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inspection", x => x.inspectionid);
                    table.ForeignKey(
                        name: "FK_inspection_buyer_buyer_id",
                        column: x => x.buyerid,
                        principalTable: "buyer",
                        principalColumn: "buyer_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inspection_mechanic_mechanic_id",
                        column: x => x.mechanicid,
                        principalTable: "mechanic",
                        principalColumn: "mechanic_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inspection_vehicle_vehicle_id",
                        column: x => x.vehicleid,
                        principalTable: "vehicle",
                        principalColumn: "vehicle_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_inspection_buyer_id",
                table: "inspection",
                column: "buyer_id");

            migrationBuilder.CreateIndex(
                name: "IX_inspection_mechanic_id",
                table: "inspection",
                column: "mechanic_id");

            migrationBuilder.CreateIndex(
                name: "IX_inspection_vehicle_id",
                table: "inspection",
                column: "vehicle_id");
        }
    }
}
