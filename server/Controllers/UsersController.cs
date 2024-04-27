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
     [HttpGet]
    public IActionResult GetAllUsers()
    {
        try
        {
            var users = _context.Users.ToList();

            return Ok(users);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
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
    [HttpGet("counts")]
     public IActionResult GetCounts()
    {
        try
        {
            // Count number of unique sellers in the Advertise table
            int numberOfSellers = _context.Advertises.Select(a => a.SellerID).Distinct().Count();

            // Count number of buyers in the Buyer table
            int numberOfBuyers = _context.Buyers.Count();

            var counts = new
            {
                NumberOfSellers = numberOfSellers,
                NumberOfBuyers = numberOfBuyers
            };

            return Ok(counts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("delete/{id}")]
public IActionResult DeleteUser(int id)
{
    try
    {
        var user = _context.Users.Find(id);

        if (user == null)
        {
            return NotFound($"User with ID {id} not found");
        }

        // Find all adverts posted by the user
        var adverts = _context.Advertises.Where(a => a.SellerID == id).ToList();

        // Extract vehicle IDs from the adverts
        var vehicleIds = adverts.Select(a => a.VehicleID).ToList();

        // Remove the adverts
        _context.Advertises.RemoveRange(adverts);

        // Remove the vehicles associated with the adverts
        var vehicles = _context.Vehicles.Where(v => vehicleIds.Contains(v.VehicleID)).ToList();
        _context.Vehicles.RemoveRange(vehicles);

        // Remove the user
        _context.Users.Remove(user);
        
        _context.SaveChanges();

        return Ok($"User with ID {id} and associated vehicles deleted successfully");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

}