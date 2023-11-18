using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("vehicle")]
public class Vehicle{
    [Key,Required]
    public required int VehicleID {get; set;}
    public required String Image {get; set;}
    public required String Name {get; set;}
    public required String Location {get; set;}
    public required int Year {get; set;}
    public required String Mileage {get; set;}
    public required String Fueltype {get; set;}
    public required int Engine {get; set;}
    public required String Transmission {get; set;}
    public required float Price {get; set;}
    
}