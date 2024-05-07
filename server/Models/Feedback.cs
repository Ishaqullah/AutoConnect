using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("feedback")]
public class Feedback{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("feedback_id")]
    public int FeedbackID { get; set; }

    [Column("feedback")]
    public required string feedback {get; set;}

     [Column("rating")]
    public int? rating {get; set;}

    [Column("user_id")]
    public int? UserID {get; set;}
    
    public User User { get; set; }
}