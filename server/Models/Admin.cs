using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("admin_main")]
public class Admin
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("admin_id")]
    public int AdminID { get; set; }

    [Required]
    [Column("admin_name")]
    public string AdminName { get; set; }

    [Required]
    [Column("admin_email")]
    [EmailAddress]
    public string AdminEmail { get; set; }

    [Required]
    [Column("admin_password")]
    public string AdminPassword { get; set; }
}
