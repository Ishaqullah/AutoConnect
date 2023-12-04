using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("seller")]
public class Seller{
    
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("seller_id")]
    public required int SellerID {get; set;}

    public List<Transaction> Transactions { get; set; }
    public List<Advertise> Advertises { get; set; }
    public List<Feedback> Feedbacks { get; set; }
    public User User { get; set; }

}