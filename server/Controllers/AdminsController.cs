using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;

[EnableCors("AllowAll")]
[Route("[controller]")]
[ApiController]
public class AdminsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminsController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet("{id}")]
    public IActionResult GetAllAdmins(int id)
    {
        try
        {
             var admin = _context.Admins.Find(id);

        if (admin == null)
        {
            return NotFound($"Admin with ID {id} not found");
        }

        return Ok(admin);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpPost("signupAdmin")]
    public IActionResult SignupAdmin([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }

        try
        {
            string adminEmail = formData.GetProperty("email").GetString();
            if (_context.Admins.Any(a => a.AdminEmail == adminEmail))
            {
                return Conflict("Admin with the same email already exists");
            }

            string hash = BCrypt.Net.BCrypt.HashPassword(formData.GetProperty("password").GetString());

            var newAdmin = new Admin
            {
                AdminName = formData.GetProperty("name").GetString(),
                AdminEmail = adminEmail,
                AdminPassword = hash
            };

            _context.Admins.Add(newAdmin);
            _context.SaveChanges();

            return Ok(new { AdminId = newAdmin.AdminID, Message = "Admin signed up successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("loginAdmin")]
    public IActionResult LoginAdmin([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }

        try
        {
            string adminPassword = formData.GetProperty("password").GetString();
            string adminEmail = formData.GetProperty("email").GetString();

            var adminWithEmail = _context.Admins.FirstOrDefault(a => a.AdminEmail == adminEmail);

            if (adminWithEmail == null)
            {
                return NotFound("Admin does not exist (Incorrect Email or Password)");
            }

            bool passwordsMatch = BCrypt.Net.BCrypt.Verify(adminPassword, adminWithEmail.AdminPassword);

            if (passwordsMatch)
            {
                return Ok(new { AdminId = adminWithEmail.AdminID, Message = "Admin logged in successfully" });
            }
            else
            {
                throw new Exception("Incorrect password for admin: " + adminWithEmail.AdminEmail);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
