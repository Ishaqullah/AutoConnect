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
            string userEmail = formData.GetProperty("email").GetString();
            if (_context.Users.Any(u => u.UserEmail == userEmail))
            {
                return Conflict("User with the same email already exists");
            }
            var newUser = new User{
                UserEmail= formData.GetProperty("email").GetString(), 
                UserPassword= hash,
                Buyer = new Buyer{

                },
                Seller = new Seller{
                    
                }
            };
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new { UserId = newUser.UserID, Message = "User signed up successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("getUser/{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _context.Users.Find(id);

        if (user == null)
        {
            return NotFound(); 
        }

        return Ok(user);
    }

    [HttpPut("updateUser/{id}")]
    public IActionResult UpdateUser(int id, [FromBody] dynamic formData)
    {
        var existingUser = _context.Users.Find(id);

        if (existingUser == null)
        {
            return NotFound(); 
        }

        existingUser.UserName = formData.GetProperty("userName").GetString();
        existingUser.UserEmail = formData.GetProperty("userEmail").GetString();
        existingUser.UserPassword = formData.GetProperty("userPassword").GetString();
        existingUser.UserPhone = formData.GetProperty("userPhone").GetString();
        existingUser.UserAddress = formData.GetProperty("userAddress").GetString();

        _context.SaveChanges();

        return Ok(existingUser);
    }

    [HttpPost("loginUsers")]
    public IActionResult LoginUsers([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }
        string userPass= formData.GetProperty("password").GetString();

        try
        {
            string email=formData.GetProperty("email").GetString();
            Console.WriteLine(email);
            var userWithEmailPass = _context.Users.Where(u => u.UserEmail == email).FirstOrDefault();
            Console.WriteLine("hello");


            if(userWithEmailPass == null){
                return NotFound("User does not exist (Incorrect Username or Password)");

            }
            Console.WriteLine(userWithEmailPass.UserID);
            Console.WriteLine(userWithEmailPass.UserPassword);
            Console.WriteLine(userPass);
            bool passwordsMatch = BCrypt.Net.BCrypt.Verify(userPass, userWithEmailPass.UserPassword);
            if (passwordsMatch)
            {
                return Ok(new { UserId = userWithEmailPass.UserID, Message = "User logged in successfully" });
            }
            else
            {
                throw new Exception("Incorrect password for user: " + userWithEmailPass.UserEmail);
            }

        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}