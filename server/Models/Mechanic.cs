using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("mechanic")]
public class Mechanic{
    
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("mechanic_id")]
    public required int MechanicID {get; set;}

    [Column("mechanic_name")]
    public required string MechanicName {get; set;}

    [Column("mechanic_email")]
    public required string MechanicEmail {get; set;}
    
    [Column("mechanic_password")]
    public required string MechanicPassword {get; set;}
    
    [Column("mechanic_phone")]
    public required string MechanicPhone {get; set;}
    
    [Column("mechanic_address")]
    public required string MechanicAddress {get; set;}
    
    [Column("average_rating")]
    public required float AverageRating {get; set;}



}