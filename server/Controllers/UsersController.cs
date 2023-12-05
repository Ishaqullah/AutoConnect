using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

[EnableCors("AllowAll")]
[Route("[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("signupUsers")]
    public IActionResult SignupUsers([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }
        Console.WriteLine(formData.GetProperty("email"));
        Console.WriteLine(formData.GetProperty("password"));
        string hash= BCrypt.Net.BCrypt.HashPassword(formData.GetProperty("password").GetString());
        Console.WriteLine(hash);

        try
        {
            var newUser = new User{
                UserEmail= formData.GetProperty("email"), 
                UserPassword= hash,
            };

            newUser.Seller = new Seller();

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok("User submitted successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("loginUsers")]
    public IActionResult LoginUsers([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }
        string hash= BCrypt.Net.BCrypt.HashPassword(formData.GetProperty("password").GetString());

        try
        {
            string email=formData.GetProperty("email").GetString();
            var userWithEmail = _context.Users.Where(u => u.UserEmail == email).ToList();
            
            if(userWithEmail == null){
                return NotFound("User Does not exist");

            }

            var userPassword = _context.Users
            .Where(u => u.UserEmail == email && u.UserPassword == hash)
            .Select(u => u.UserPassword)
            .FirstOrDefault();

            if(userPassword == null){
                return NotFound("Incorrect Password");
            }

            return Ok("Login Successful");





        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}