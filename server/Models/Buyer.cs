using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("buyer")]
public class Buyer
{
    
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("buyer_id")]
    public int BuyerID {get; set;}

    [Column("user_id")]
    public int? UserID {get; set;}

    public List<Transaction> Transactions { get; set; }
    public List<Appointment> Appointments { get; set; }
    
    public User User { get; set; }

    public List<SavedAds> SavedAds { get; set; }
}