using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("user_main")]

public class User{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("user_id")]
    public required int UserID { get; set; }
    [Column("user_name")]
    public required string UserName { get; set; }
    [Column("user_email")]
    public required string UserEmail { get; set; }
    [Column("user_password")]
    public required string UserPassword { get; set; }
    [Column("user_phone")]
    public required string UserPhone;
    [Column("user_address")]
    public required string UserAddress;

    [Column("seller_id")]
    public int? SellerID {get; set;}
    
    [Column("buyer_id")]
    public int? BuyerID {get; set;}

    public Seller Seller { get; set; }
    public Buyer Buyer { get; set; }

}