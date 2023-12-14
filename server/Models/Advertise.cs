using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("advertise")]
public class Advertise{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("advertise_id")]
    public int AdvertiseID {get; set; }     
    
    [Column("advertise_name")]
    public required string AdvertiseName {get; set; }    
    
    [Column("vehicle_id")]
    public int? VehicleID {get; set; }     
    
    [Column("seller_id")]
    public int? SellerID {get; set; }     

    public Transaction Transaction { get; set; }
    public Vehicle Vehicle { get; set; }
    public Seller Seller { get; set; }

}