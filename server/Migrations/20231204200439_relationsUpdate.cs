using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class relationsUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "buyer",
                columns: table => new
                {
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_buyer", x => x.buyerid);
                });

            migrationBuilder.CreateTable(
                name: "mechanic",
                columns: table => new
                {
                    mechanicid = table.Column<int>(name: "mechanic_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    mechanicname = table.Column<string>(name: "mechanic_name", type: "text", nullable: false),
                    mechanicemail = table.Column<string>(name: "mechanic_email", type: "text", nullable: false),
                    mechanicpassword = table.Column<string>(name: "mechanic_password", type: "text", nullable: false),
                    mechanicphone = table.Column<string>(name: "mechanic_phone", type: "text", nullable: false),
                    mechanicaddress = table.Column<string>(name: "mechanic_address", type: "text", nullable: false),
                    averagerating = table.Column<float>(name: "average_rating", type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mechanic", x => x.mechanicid);
                });

            migrationBuilder.CreateTable(
                name: "seller",
                columns: table => new
                {
                    sellerid = table.Column<int>(name: "seller_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_seller", x => x.sellerid);
                });

            migrationBuilder.CreateTable(
                name: "vehicle",
                columns: table => new
                {
                    vehicleid = table.Column<int>(name: "vehicle_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    vehicleimages = table.Column<string>(name: "vehicle_images", type: "text", nullable: false),
                    vehiclecity = table.Column<string>(name: "vehicle_city", type: "text", nullable: false),
                    vehicleregistrationyear = table.Column<DateOnly>(name: "vehicle_registration_year", type: "date", nullable: false),
                    vehiclemodelyear = table.Column<DateOnly>(name: "vehicle_model_year", type: "date", nullable: false),
                    vehicleregistrationcity = table.Column<string>(name: "vehicle_registration_city", type: "text", nullable: false),
                    mileage = table.Column<int>(type: "integer", nullable: false),
                    make = table.Column<string>(type: "text", nullable: false),
                    model = table.Column<string>(type: "text", nullable: false),
                    variant = table.Column<string>(type: "text", nullable: false),
                    colour = table.Column<string>(type: "text", nullable: false),
                    bodytype = table.Column<string>(name: "body_type", type: "text", nullable: false),
                    enginecapacity = table.Column<string>(name: "engine_capacity", type: "text", nullable: false),
                    enginetransmission = table.Column<string>(name: "engine_transmission", type: "text", nullable: false),
                    features = table.Column<string>(type: "text", nullable: false),
                    assembly = table.Column<string>(type: "text", nullable: false),
                    maxprice = table.Column<float>(name: "max_price", type: "real", nullable: false),
                    minprice = table.Column<float>(name: "min_price", type: "real", nullable: false),
                    price = table.Column<float>(type: "real", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicle", x => x.vehicleid);
                });

            migrationBuilder.CreateTable(
                name: "mechanic_rating",
                columns: table => new
                {
                    mechanicratingid = table.Column<int>(name: "mechanic_rating_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    mechanicid = table.Column<int>(name: "mechanic_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mechanic_rating", x => x.mechanicratingid);
                    table.ForeignKey(
                        name: "FK_mechanic_rating_mechanic_mechanic_id",
                        column: x => x.mechanicid,
                        principalTable: "mechanic",
                        principalColumn: "mechanic_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "feedback",
                columns: table => new
                {
                    feedbackid = table.Column<int>(name: "feedback_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    feedback = table.Column<string>(type: "text", nullable: false),
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false),
                    sellerid = table.Column<int>(name: "seller_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_feedback", x => x.feedbackid);
                    table.ForeignKey(
                        name: "FK_feedback_buyer_buyer_id",
                        column: x => x.buyerid,
                        principalTable: "buyer",
                        principalColumn: "buyer_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_feedback_seller_seller_id",
                        column: x => x.sellerid,
                        principalTable: "seller",
                        principalColumn: "seller_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_main",
                columns: table => new
                {
                    userid = table.Column<int>(name: "user_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    username = table.Column<string>(name: "user_name", type: "text", nullable: false),
                    useremail = table.Column<string>(name: "user_email", type: "text", nullable: false),
                    userpassword = table.Column<string>(name: "user_password", type: "text", nullable: false),
                    sellerid = table.Column<int>(name: "seller_id", type: "integer", nullable: false),
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_main", x => x.userid);
                    table.ForeignKey(
                        name: "FK_user_main_buyer_buyer_id",
                        column: x => x.buyerid,
                        principalTable: "buyer",
                        principalColumn: "buyer_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_main_seller_seller_id",
                        column: x => x.sellerid,
                        principalTable: "seller",
                        principalColumn: "seller_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "advertise",
                columns: table => new
                {
                    advertiseid = table.Column<int>(name: "advertise_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    advertisename = table.Column<string>(name: "advertise_name", type: "text", nullable: false),
                    vehicleid = table.Column<int>(name: "vehicle_id", type: "integer", nullable: false),
                    sellerid = table.Column<int>(name: "seller_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_advertise", x => x.advertiseid);
                    table.ForeignKey(
                        name: "FK_advertise_seller_seller_id",
                        column: x => x.sellerid,
                        principalTable: "seller",
                        principalColumn: "seller_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_advertise_vehicle_vehicle_id",
                        column: x => x.vehicleid,
                        principalTable: "vehicle",
                        principalColumn: "vehicle_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inspection",
                columns: table => new
                {
                    inspectionid = table.Column<int>(name: "inspection_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "text", nullable: false),
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false),
                    mechanicid = table.Column<int>(name: "mechanic_id", type: "integer", nullable: false),
                    vehicleid = table.Column<int>(name: "vehicle_id", type: "integer", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "transaction",
                columns: table => new
                {
                    transactionid = table.Column<int>(name: "transaction_id", type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    finalprice = table.Column<float>(name: "final_price", type: "real", nullable: false),
                    buyerid = table.Column<int>(name: "buyer_id", type: "integer", nullable: false),
                    sellerid = table.Column<int>(name: "seller_id", type: "integer", nullable: false),
                    advertiseid = table.Column<int>(name: "advertise_id", type: "integer", nullable: false),
                    vehicleid = table.Column<int>(name: "vehicle_id", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_transaction", x => x.transactionid);
                    table.ForeignKey(
                        name: "FK_transaction_advertise_advertise_id",
                        column: x => x.advertiseid,
                        principalTable: "advertise",
                        principalColumn: "advertise_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_transaction_buyer_buyer_id",
                        column: x => x.buyerid,
                        principalTable: "buyer",
                        principalColumn: "buyer_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_transaction_seller_seller_id",
                        column: x => x.sellerid,
                        principalTable: "seller",
                        principalColumn: "seller_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_transaction_vehicle_vehicle_id",
                        column: x => x.vehicleid,
                        principalTable: "vehicle",
                        principalColumn: "vehicle_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_advertise_seller_id",
                table: "advertise",
                column: "seller_id");

            migrationBuilder.CreateIndex(
                name: "IX_advertise_vehicle_id",
                table: "advertise",
                column: "vehicle_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_feedback_buyer_id",
                table: "feedback",
                column: "buyer_id");

            migrationBuilder.CreateIndex(
                name: "IX_feedback_seller_id",
                table: "feedback",
                column: "seller_id");

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

            migrationBuilder.CreateIndex(
                name: "IX_mechanic_rating_mechanic_id",
                table: "mechanic_rating",
                column: "mechanic_id");

            migrationBuilder.CreateIndex(
                name: "IX_transaction_advertise_id",
                table: "transaction",
                column: "advertise_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_transaction_buyer_id",
                table: "transaction",
                column: "buyer_id");

            migrationBuilder.CreateIndex(
                name: "IX_transaction_seller_id",
                table: "transaction",
                column: "seller_id");

            migrationBuilder.CreateIndex(
                name: "IX_transaction_vehicle_id",
                table: "transaction",
                column: "vehicle_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_main_buyer_id",
                table: "user_main",
                column: "buyer_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_main_seller_id",
                table: "user_main",
                column: "seller_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "feedback");

            migrationBuilder.DropTable(
                name: "inspection");

            migrationBuilder.DropTable(
                name: "mechanic_rating");

            migrationBuilder.DropTable(
                name: "transaction");

            migrationBuilder.DropTable(
                name: "user_main");

            migrationBuilder.DropTable(
                name: "mechanic");

            migrationBuilder.DropTable(
                name: "advertise");

            migrationBuilder.DropTable(
                name: "buyer");

            migrationBuilder.DropTable(
                name: "seller");

            migrationBuilder.DropTable(
                name: "vehicle");
        }
    }
}
