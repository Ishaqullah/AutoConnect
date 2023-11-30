using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("transaction")]
public class Transaction{
    [Key,Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("transaction_id")]
    public required int TransactionID {get; set;}    
    
    [Column("final_price")]
    public required float FinalPrice {get; set;}    

}