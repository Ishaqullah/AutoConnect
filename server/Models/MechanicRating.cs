using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("mechanic_rating")]
public class MechanicRating
{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("mechanic_rating_id")]
    public int MechanicRatingID { get; set; }
    
    [Column("rating")]
    public int Rating {get; set;}
    
    [Column("review")]
    public string Review {get; set;}

    [Column("mechanic_id")]
    public int? MechanicID {get; set;}

    [Column("user_id")]
    public int? UserID { get; set;}

    public User User { get; set; }
    public Mechanic Mechanic { get; set; }

}
