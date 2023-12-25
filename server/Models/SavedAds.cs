using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("saved_ads")]

public class SavedAds
{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column ("savedAd_id")]
    public int SavedAdId { get; set; }

    [Column ("ad_Id")]
    public int? AdId {get;set;}
    public Advertise Advertise { get; set; }

    [Column ("buyer_id")]
    public int? BuyerId {get;set;}

    public Buyer Buyer { get; set; }
}


