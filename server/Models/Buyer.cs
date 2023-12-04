using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("buyer")]
public class Buyer
{
    
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("buyer_id")]
    public required int BuyerID {get; set;}

    public List<Transaction> Transactions { get; set; }
    public List<Inspection> Inspections { get; set; }
    public List<Feedback> Feedbacks { get; set; }
    public User User { get; set; }
}