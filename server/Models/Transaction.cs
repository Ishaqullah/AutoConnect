using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("transaction")]
public class Transaction{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("transaction_id")]
    public int TransactionID {get; set;}    
    
    [Column("final_price")]
    public required float FinalPrice {get; set;}  

    [Column("buyer_id")]
    public int? BuyerID {get; set;}  
    
    [Column("seller_id")]
    public int? SellerID {get; set;}  
    
    [Column("advertise_id")]
    public int? AdvertiseID {get; set;}  
    
    [Column("vehicle_id")]
    public int? VehicleID {get; set;}  

    public Buyer Buyer { get; set; }  
    public Seller Seller { get; set; }  
    public Advertise Advertise { get; set; }  
    public Vehicle Vehicle { get; set; }  

}