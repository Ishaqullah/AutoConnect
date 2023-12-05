using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Buyer> Buyers { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Transaction> Sellers { get; set; }
    public DbSet<Advertise> Advertises { get; set; }
    public DbSet<Inspection> Inspections  { get; set; }
    public DbSet<Mechanic> Mechanics  { get; set; }
    public DbSet<MechanicRating> MechanicRatings  { get; set; }
    public DbSet<Feedback> Feedbacks  { get; set; }
    public DbSet<User> Users  { get; set; }

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
            .HasForeignKey<Advertise>(a => a.VehicleID);

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
        
        modelBuilder.Entity<Inspection>()
            .HasOne(i => i.Buyer)
            .WithMany(b => b.Inspections)
            .HasForeignKey(i => i.BuyerID);
        
        modelBuilder.Entity<Inspection>()
            .HasOne(i => i.Mechanic)
            .WithMany(m => m.Inspections)
            .HasForeignKey(i => i.MechanicID);
        
        modelBuilder.Entity<Inspection>()
            .HasOne(i => i.Vehicle)
            .WithMany(v => v.Inspections)
            .HasForeignKey(i => i.VehicleID);
        
        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.Buyer)
            .WithMany(b => b.Feedbacks)
            .HasForeignKey(f => f.BuyerID);
        
        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.Seller)
            .WithMany(s => s.Feedbacks)
            .HasForeignKey(f => f.SellerID);
    }
    

}