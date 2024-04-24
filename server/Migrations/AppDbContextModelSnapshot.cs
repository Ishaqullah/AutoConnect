﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Admin", b =>
                {
                    b.Property<int>("AdminID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("admin_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AdminID"));

                    b.Property<string>("AdminEmail")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("admin_email");

                    b.Property<string>("AdminName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("admin_name");

                    b.Property<string>("AdminPassword")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("admin_password");

                    b.HasKey("AdminID");

                    b.ToTable("admin_main");
                });

            modelBuilder.Entity("Advertise", b =>
                {
                    b.Property<int>("AdvertiseID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("advertise_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AdvertiseID"));

                    b.Property<string>("AdvertiseName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("advertise_name");

                    b.Property<int?>("SellerID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("seller_id");

                    b.Property<int?>("VehicleID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("AdvertiseID");

                    b.HasIndex("SellerID");

                    b.HasIndex("VehicleID")
                        .IsUnique();

                    b.ToTable("advertise");
                });

            modelBuilder.Entity("Buyer", b =>
                {
                    b.Property<int>("BuyerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("buyer_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("BuyerID"));

                    b.Property<int?>("UserID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("BuyerID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("buyer");
                });

            modelBuilder.Entity("Feedback", b =>
                {
                    b.Property<int>("FeedbackID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("feedback_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("FeedbackID"));

                    b.Property<int?>("BuyerID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("buyer_id");

                    b.Property<int?>("SellerID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("seller_id");

                    b.Property<string>("feedback")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("feedback");

                    b.HasKey("FeedbackID");

                    b.HasIndex("BuyerID");

                    b.HasIndex("SellerID");

                    b.ToTable("feedback");
                });

            modelBuilder.Entity("Inspection", b =>
                {
                    b.Property<int>("InspectionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("inspection_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("InspectionID"));

                    b.Property<int?>("BuyerID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("buyer_id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<int?>("MechanicID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("mechanic_id");

                    b.Property<int?>("VehicleID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("InspectionID");

                    b.HasIndex("BuyerID");

                    b.HasIndex("MechanicID");

                    b.HasIndex("VehicleID");

                    b.ToTable("inspection");
                });

            modelBuilder.Entity("Mechanic", b =>
                {
                    b.Property<int>("MechanicID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("mechanic_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MechanicID"));

                    b.Property<float>("AverageRating")
                        .HasColumnType("real")
                        .HasColumnName("average_rating");

                    b.Property<string>("MechanicAddress")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("mechanic_address");

                    b.Property<string>("MechanicEmail")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("mechanic_email");

                    b.Property<string>("MechanicName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("mechanic_name");

                    b.Property<string>("MechanicPassword")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("mechanic_password");

                    b.Property<string>("MechanicPhone")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("mechanic_phone");

                    b.HasKey("MechanicID");

                    b.ToTable("mechanic");
                });

            modelBuilder.Entity("MechanicRating", b =>
                {
                    b.Property<int>("MechanicRatingID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("mechanic_rating_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MechanicRatingID"));

                    b.Property<int?>("MechanicID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("mechanic_id");

                    b.HasKey("MechanicRatingID");

                    b.HasIndex("MechanicID");

                    b.ToTable("mechanic_rating");
                });

            modelBuilder.Entity("SavedAds", b =>
                {
                    b.Property<int>("SavedAdId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("savedAd_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SavedAdId"));

                    b.Property<int?>("AdId")
                        .HasColumnType("integer")
                        .HasColumnName("ad_Id");

                    b.Property<int?>("BuyerId")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("buyer_id");

                    b.HasKey("SavedAdId");

                    b.HasIndex("AdId");

                    b.HasIndex("BuyerId");

                    b.ToTable("saved_ads");
                });

            modelBuilder.Entity("Seller", b =>
                {
                    b.Property<int>("SellerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("seller_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SellerID"));

                    b.Property<int?>("UserID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("SellerID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("seller");
                });

            modelBuilder.Entity("Transaction", b =>
                {
                    b.Property<int>("TransactionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("transaction_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TransactionID"));

                    b.Property<int?>("AdvertiseID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("advertise_id");

                    b.Property<int?>("BuyerID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("buyer_id");

                    b.Property<float>("FinalPrice")
                        .HasColumnType("real")
                        .HasColumnName("final_price");

                    b.Property<int?>("SellerID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("seller_id");

                    b.Property<int?>("VehicleID")
                        .IsRequired()
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    b.HasKey("TransactionID");

                    b.HasIndex("AdvertiseID")
                        .IsUnique();

                    b.HasIndex("BuyerID");

                    b.HasIndex("SellerID");

                    b.HasIndex("VehicleID")
                        .IsUnique();

                    b.ToTable("transaction");
                });

            modelBuilder.Entity("User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserID"));

                    b.Property<string>("UserAddress")
                        .HasColumnType("text")
                        .HasColumnName("user_address");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("user_email");

                    b.Property<string>("UserName")
                        .HasColumnType("text")
                        .HasColumnName("user_name");

                    b.Property<string>("UserPassword")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("user_password");

                    b.Property<string>("UserPhone")
                        .HasColumnType("text")
                        .HasColumnName("user_phone");

                    b.HasKey("UserID");

                    b.ToTable("user_main");
                });

            modelBuilder.Entity("Vehicle", b =>
                {
                    b.Property<int>("VehicleID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("vehicle_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("VehicleID"));

                    b.Property<string>("Assembly")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("assembly");

                    b.Property<string>("BodyType")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("body_type");

                    b.Property<string>("Colour")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("colour");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("EngineCapacity")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("engine_capacity");

                    b.Property<string>("EngineTransmission")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("engine_transmission");

                    b.Property<string>("Features")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("features");

                    b.Property<string>("Make")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("make");

                    b.Property<float>("MaxPrice")
                        .HasColumnType("real")
                        .HasColumnName("max_price");

                    b.Property<int>("Mileage")
                        .HasColumnType("integer")
                        .HasColumnName("mileage");

                    b.Property<float>("MinPrice")
                        .HasColumnType("real")
                        .HasColumnName("min_price");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("model");

                    b.Property<float>("Price")
                        .HasColumnType("real")
                        .HasColumnName("price");

                    b.Property<string>("Variant")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("variant");

                    b.Property<string>("VehicleCity")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("vehicle_city");

                    b.Property<string>("VehicleImages")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("vehicle_images");

                    b.Property<string>("VehicleModelYear")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("vehicle_model_year");

                    b.Property<string>("VehicleRegistrationCity")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("vehicle_registration_city");

                    b.Property<string>("VehicleRegistrationYear")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("vehicle_registration_year");

                    b.HasKey("VehicleID");

                    b.ToTable("vehicle");
                });

            modelBuilder.Entity("Advertise", b =>
                {
                    b.HasOne("Seller", "Seller")
                        .WithMany("Advertises")
                        .HasForeignKey("SellerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Vehicle", "Vehicle")
                        .WithOne("Advertise")
                        .HasForeignKey("Advertise", "VehicleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Seller");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("Buyer", b =>
                {
                    b.HasOne("User", "User")
                        .WithOne("Buyer")
                        .HasForeignKey("Buyer", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Feedback", b =>
                {
                    b.HasOne("Buyer", "Buyer")
                        .WithMany("Feedbacks")
                        .HasForeignKey("BuyerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Seller", "Seller")
                        .WithMany("Feedbacks")
                        .HasForeignKey("SellerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Buyer");

                    b.Navigation("Seller");
                });

            modelBuilder.Entity("Inspection", b =>
                {
                    b.HasOne("Buyer", "Buyer")
                        .WithMany("Inspections")
                        .HasForeignKey("BuyerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Mechanic", "Mechanic")
                        .WithMany("Inspections")
                        .HasForeignKey("MechanicID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Vehicle", "Vehicle")
                        .WithMany("Inspections")
                        .HasForeignKey("VehicleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Buyer");

                    b.Navigation("Mechanic");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("MechanicRating", b =>
                {
                    b.HasOne("Mechanic", "Mechanic")
                        .WithMany("MechanicRatings")
                        .HasForeignKey("MechanicID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mechanic");
                });

            modelBuilder.Entity("SavedAds", b =>
                {
                    b.HasOne("Advertise", "Advertise")
                        .WithMany("SavedAds")
                        .HasForeignKey("AdId");

                    b.HasOne("Buyer", "Buyer")
                        .WithMany("SavedAds")
                        .HasForeignKey("BuyerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Advertise");

                    b.Navigation("Buyer");
                });

            modelBuilder.Entity("Seller", b =>
                {
                    b.HasOne("User", "User")
                        .WithOne("Seller")
                        .HasForeignKey("Seller", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Transaction", b =>
                {
                    b.HasOne("Advertise", "Advertise")
                        .WithOne("Transaction")
                        .HasForeignKey("Transaction", "AdvertiseID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Buyer", "Buyer")
                        .WithMany("Transactions")
                        .HasForeignKey("BuyerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Seller", "Seller")
                        .WithMany("Transactions")
                        .HasForeignKey("SellerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Vehicle", "Vehicle")
                        .WithOne("Transaction")
                        .HasForeignKey("Transaction", "VehicleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Advertise");

                    b.Navigation("Buyer");

                    b.Navigation("Seller");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("Advertise", b =>
                {
                    b.Navigation("SavedAds");

                    b.Navigation("Transaction")
                        .IsRequired();
                });

            modelBuilder.Entity("Buyer", b =>
                {
                    b.Navigation("Feedbacks");

                    b.Navigation("Inspections");

                    b.Navigation("SavedAds");

                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("Mechanic", b =>
                {
                    b.Navigation("Inspections");

                    b.Navigation("MechanicRatings");
                });

            modelBuilder.Entity("Seller", b =>
                {
                    b.Navigation("Advertises");

                    b.Navigation("Feedbacks");

                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("User", b =>
                {
                    b.Navigation("Buyer")
                        .IsRequired();

                    b.Navigation("Seller")
                        .IsRequired();
                });

            modelBuilder.Entity("Vehicle", b =>
                {
                    b.Navigation("Advertise")
                        .IsRequired();

                    b.Navigation("Inspections");

                    b.Navigation("Transaction")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
