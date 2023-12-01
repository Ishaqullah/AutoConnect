using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("feedback")]
public class Feedback{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("feedback_id")]
    public required int FeedbackID { get; set; }

    [Column("feedback")]
    public string feedback {get; set;}

    [Column("buyer_id")]
    public int? BuyerID {get; set;}
    
    [Column("seller_id")]
    public int? SellerID {get; set;}
    public Buyer Buyer { get; set; }
    public Seller Seller { get; set; }
}