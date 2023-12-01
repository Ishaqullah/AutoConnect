using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("vehicle")]
public class Vehicle{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("vehicle_id")]
    public required int VehicleID {get; set;}
    
    [Column("vehicle_city")]
    public required string VehicleCity {get; set;}
    
    [Column("vehicle_registration_year")]
    public required DateOnly VehicleRegistrationYear {get; set;}
    
    [Column("vehicle_registration_city")]
    public required string VehicleRegistrationCity {get; set;}
    
    [Column("mileage")]
    public required int Mileage {get; set;}
    
    [Column("make")]
    public required string Make {get; set;}
    
    [Column("model")]
    public required string Model {get; set;}
    
    [Column("variant")]
    public required string Variant {get; set;}
    
    [Column("colour")]
    public required string Colour {get; set;}
    
    [Column("body_type")]
    public required string BodyType {get; set;}
    
    [Column("engine_capacity")]
    public required string EngineCapacity {get; set;}
    
    [Column("engine_transmission")]
    public required int EngineTransmission {get; set;}
    
    [Column("assembly")]
    public required string Assembly {get; set;}
    
    [Column("max_price")]
    public required float MaxPrice {get; set;}
    
    [Column("min_price")]
    public required float MinPrice {get; set;}
    
    [Column("price")]
    public required float Price {get; set;}
    
    [Column("description")]
    public string Description {get; set;}

    public Transaction Transaction { get; set; }
    public Advertise Advertise { get; set; }
    public List<Inspection> Inspections { get; set; }
    
}