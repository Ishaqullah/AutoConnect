using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("feedback")]
public class Feedback{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("feedback_id")]

    [Column("feedback")]
    public string feedback {get; set;}
}