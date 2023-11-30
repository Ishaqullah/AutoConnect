using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("inspection")]
public class Inspection{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("inspection_id")]

    [Column("description")]
    public string Description {get; set;}
}