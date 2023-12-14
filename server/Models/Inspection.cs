using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("inspection")]
public class Inspection{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("inspection_id")]
    public int InspectionID { get; set; }

    [Column("description")]
    public string Description {get; set;}

    [Column("buyer_id")]
    public int? BuyerID {get; set;}

    [Column("mechanic_id")]
    public int? MechanicID {get; set;}
    
    [Column("vehicle_id")]
    public int? VehicleID {get; set;}
    public Buyer Buyer { get; set; }  
    public Mechanic Mechanic { get; set; }  
    public Vehicle Vehicle { get; set; }  

}