using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("appointment")]
public class Appointment{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("appointment_id")]
    public int AppointmentID { get; set; }

    [Column("status")]
    public string Status {get; set;}


    [Column("date")]
    public string DateAndTime {get; set;}

    [Column("buyer_id")]
    public int? BuyerID {get; set;}

    [Column("mechanic_id")]
    public int? MechanicID {get; set;}
    
    
    public Buyer Buyer { get; set; }  
    public Mechanic Mechanic { get; set; }  
   

}