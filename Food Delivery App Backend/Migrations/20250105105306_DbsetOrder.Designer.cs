﻿// <auto-generated />
using System;
using Food_Delivery_App_Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Food_Delivery_App_Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250105105306_DbsetOrder")]
    partial class DbsetOrder
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.Cart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MenuItemId")
                        .HasColumnType("int");

                    b.Property<int?>("OrderId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int?>("RestaurantRestaurentId")
                        .HasColumnType("int");

                    b.Property<int>("RestaurentId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TimeAdded")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MenuItemId");

                    b.HasIndex("OrderId");

                    b.HasIndex("RestaurantRestaurentId");

                    b.ToTable("carts");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.MenuItem", b =>
                {
                    b.Property<int>("MenuId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MenuId"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Discount")
                        .HasColumnType("int");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("RestaurantRestaurentId")
                        .HasColumnType("int");

                    b.Property<int>("RestaurentId")
                        .HasColumnType("int");

                    b.Property<bool>("isAvailable")
                        .HasColumnType("bit");

                    b.HasKey("MenuId");

                    b.HasIndex("RestaurantRestaurentId");

                    b.ToTable("menuItems");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrderId"));

                    b.Property<DateTime>("DeliveryDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("MenuItemId")
                        .HasColumnType("int");

                    b.Property<string>("OrderStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("RestaurentId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TimeAdded")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("OrderId");

                    b.HasIndex("MenuItemId");

                    b.HasIndex("RestaurentId");

                    b.ToTable("orders");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.Restaurant", b =>
                {
                    b.Property<int>("RestaurentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RestaurentId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("CloseTime")
                        .HasColumnType("time");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("OpenTime")
                        .HasColumnType("time");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RestaurentId");

                    b.ToTable("restaurants");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.Cart", b =>
                {
                    b.HasOne("Food_Delivery_App_Backend.Model.MenuItem", "MenuItem")
                        .WithMany("Carts")
                        .HasForeignKey("MenuItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Food_Delivery_App_Backend.Model.Order", "Order")
                        .WithMany("Carts")
                        .HasForeignKey("OrderId");

                    b.HasOne("Food_Delivery_App_Backend.Model.Restaurant", "Restaurant")
                        .WithMany("Cart")
                        .HasForeignKey("RestaurantRestaurentId");

                    b.Navigation("MenuItem");

                    b.Navigation("Order");

                    b.Navigation("Restaurant");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.MenuItem", b =>
                {
                    b.HasOne("Food_Delivery_App_Backend.Model.Restaurant", "Restaurant")
                        .WithMany("MenuItems")
                        .HasForeignKey("RestaurantRestaurentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Restaurant");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.Order", b =>
                {
                    b.HasOne("Food_Delivery_App_Backend.Model.MenuItem", "MenuItem")
                        .WithMany("Orders")
                        .HasForeignKey("MenuItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Food_Delivery_App_Backend.Model.Restaurant", "Restaurent")
                        .WithMany("Order")
                        .HasForeignKey("RestaurentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MenuItem");

                    b.Navigation("Restaurent");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.MenuItem", b =>
                {
                    b.Navigation("Carts");

                    b.Navigation("Orders");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.Order", b =>
                {
                    b.Navigation("Carts");
                });

            modelBuilder.Entity("Food_Delivery_App_Backend.Model.Restaurant", b =>
                {
                    b.Navigation("Cart");

                    b.Navigation("MenuItems");

                    b.Navigation("Order");
                });
#pragma warning restore 612, 618
        }
    }
}
