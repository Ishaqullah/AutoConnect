using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("mechanic")]
public class Mechanic
{   
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("mechanic_id")]
    public int MechanicID {get; set;}

    [Column("mechanic_name")]
    public required string MechanicName {get; set;}

    [Column("mechanic_email")]
    public required string MechanicEmail {get; set;}
    
    [Column("mechanic_password")]
    public required string MechanicPassword {get; set;}
    
    [Column("mechanic_phone")]
    public  string? MechanicPhone {get; set;}
    
    [Column("mechanic_address")]
    public  string? MechanicAddress {get; set;}
    
    [Column("average_rating")]
    public float AverageRating {get; set;}

    public List<MechanicRating> MechanicRatings { get; set; }

    public List<Inspection> Inspections { get; set; }
}