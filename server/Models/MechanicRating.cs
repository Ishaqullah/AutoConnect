using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("mechanic_rating")]
public class Mechanic{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("mechanic_rating_id")]
    public required int MechanicRatingID;
    [Column("rating")]
    public required int Rating;
    [Column("review")]
    public required string Review;
}
