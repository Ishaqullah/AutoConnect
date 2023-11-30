using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("advertise")]
public class Advertise{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("advertise_id")]
    public required int AdvertiseID {get; set;}    
    
    [Column("advertise_name")]
    public required string AdvertiseName {get; set;}    

}