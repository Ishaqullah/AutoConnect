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
    public required int Rating;
    
    [Column("review")]
    public required string Review;

    [Column("mechanic_id")]
    public int? MechanicID {get; set;}
    public Mechanic Mechanic { get; set; }

}
