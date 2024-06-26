using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Buyer> Buyers { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Seller> Sellers { get; set; }
    public DbSet<Advertise> Advertises { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Mechanic> Mechanics { get; set; }
    public DbSet<MechanicRating> MechanicRatings { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<User> Users { get; set; }

    public DbSet<Admin> Admins { get; set; }

    public DbSet<SavedAds> SavedAds { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Buyer)
            .WithMany(b => b.Transactions)
            .HasForeignKey(t => t.BuyerID);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Seller)
            .WithMany(s => s.Transactions)
            .HasForeignKey(t => t.SellerID);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Advertise)
            .WithOne(a => a.Transaction)
            .HasForeignKey<Transaction>(t => t.AdvertiseID);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Vehicle)
            .WithOne(v => v.Transaction)
            .HasForeignKey<Transaction>(t => t.VehicleID);

        modelBuilder.Entity<Advertise>()
            .HasOne(a => a.Vehicle)
            .WithOne(v => v.Advertise)
            .HasForeignKey<Advertise>(a => a.VehicleID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Seller>()
            .HasOne(s => s.User)
            .WithOne(u => u.Seller)
            .HasForeignKey<Seller>(s => s.UserID);

        modelBuilder.Entity<Buyer>()
            .HasOne(b => b.User)
            .WithOne(u => u.Buyer)
            .HasForeignKey<Buyer>(b => b.UserID);

        modelBuilder.Entity<Advertise>()
            .HasOne(a => a.Seller)
            .WithMany(s => s.Advertises)
            .HasForeignKey(a => a.SellerID);


        modelBuilder.Entity<MechanicRating>()
            .HasOne(mr => mr.Mechanic)
            .WithMany(m => m.MechanicRatings)
            .HasForeignKey(mr => mr.MechanicID);


        modelBuilder.Entity<MechanicRating>()
        .HasOne(mr => mr.User)  // Assuming there's a User navigation property in the MechanicRating entity pointing to the User entity
        .WithMany(u => u.MechanicRatings)
        .HasForeignKey(mr => mr.UserID)  // Assuming the foreign key property in MechanicRating entity referring to User is called UserID
        .OnDelete(DeleteBehavior.Cascade); // Cascade delete behavior

        modelBuilder.Entity<Appointment>()
            .HasOne(i => i.Buyer)
            .WithMany(b => b.Appointments)
            .HasForeignKey(i => i.BuyerID);

        modelBuilder.Entity<Appointment>()
            .HasOne(i => i.Mechanic)
            .WithMany(m => m.Appointments)
            .HasForeignKey(i => i.MechanicID);

   
        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.User)
            .WithMany(u => u.Feedbacks)
            .HasForeignKey(f => f.UserID);

    

        modelBuilder.Entity<SavedAds>()
            .HasOne(sa=>sa.Buyer)
            .WithMany(a=>a.SavedAds)
            .HasForeignKey(f => f.BuyerId);

        modelBuilder.Entity<SavedAds>()
            .HasOne(sa => sa.Advertise)
            .WithMany(b=> b.SavedAds)
            .HasForeignKey(f => f.AdId);
    }


}