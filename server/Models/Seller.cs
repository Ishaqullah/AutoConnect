using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("seller")]
public class Seller{
    
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("seller_id")]
    public required int SellerID {get; set;}

    [Column("seller_name")]
    public required string SellerName {get; set;}

    [Column("seller_email")]
    public required string SellerEmail {get; set;}
    
    [Column("seller_password")]
    public required string SellerPassword {get; set;}
    
    [Column("seller_phone")]
    public required string SellerPhone {get; set;}
    
    [Column("seller_address")]
    public required string SellerAddress {get; set;}

    public List<Transaction> Transactions { get; set; }
    public List<Advertise> Advertises { get; set; }
    public List<Feedback> Feedbacks { get; set; }

}