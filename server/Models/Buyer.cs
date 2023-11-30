using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("buyer")]
public class Buyer{
    
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("buyer_id")]
    public required int BuyerID {get; set;}

    [Column("buyer_name")]
    public required string BuyerName {get; set;}

    [Column("buyer_email")]
    public required string BuyerEmail {get; set;}
    
    [Column("buyer_password")]
    public required string BuyerPassword {get; set;}
    
    [Column("buyer_phone")]
    public required string BuyerPhone {get; set;}
    
    [Column("buyer_address")]
    public required string BuyerAddress {get; set;}

}