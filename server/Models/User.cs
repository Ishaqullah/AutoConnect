using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("user_main")]

public class User
{
    [Key, Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("user_id")]
    public int UserID { get; set; }

    [Column("user_name")]
    public string? UserName { get; set; }
    [Column("user_email")]
    public required string UserEmail { get; set; }
    [Column("user_password")]
    public required string UserPassword { get; set; }
    [Column("user_phone")]
    public string? UserPhone { get; set; }
    [Column("user_address")]
    public string? UserAddress { get; set; }


    public Seller Seller { get; set; }
    public Buyer Buyer { get; set; }
    public List<MechanicRating> MechanicRatings { get; set; }

}