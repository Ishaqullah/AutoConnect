using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using BCrypt.Net;
using System.Text.Json;

[Route("[controller]")]
[ApiController]
public class MechanicsController : ControllerBase
{
    private readonly AppDbContext _context;

    public MechanicsController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public IActionResult GetAllMechanics()
    {
        try
        {
            var mechanics = _context.Mechanics.ToList();
            var mechanicDetails = new List<object>();

            foreach (var mechanic in mechanics)
            {
                

                var mechanicDetail = new
                {
                    MechanicId = mechanic.MechanicID,
                    MechanicName = mechanic.MechanicName,
                    MechanicEmail = mechanic.MechanicEmail,
                    MechanicPhone = mechanic.MechanicPhone,
                    MechanicAddress = mechanic.MechanicAddress,
                    AverageRating = mechanic.AverageRating
                };

                mechanicDetails.Add(mechanicDetail);
            }

            return Ok(mechanicDetails);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("signup")]
    public IActionResult SignUp([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }

        try
        {
            string hashPassword = BCrypt.Net.BCrypt.HashPassword(formData.GetProperty("password").GetString());

            var newMechanic = new Mechanic
            {
                MechanicEmail = formData.GetProperty("email").GetString(),
                MechanicPassword = hashPassword,
                MechanicName = formData.GetProperty("name").GetString(),
                MechanicAddress = formData.GetProperty("address").GetString(),
                MechanicPhone = formData.GetProperty("phone").GetString()
            };

            _context.Mechanics.Add(newMechanic);
            _context.SaveChanges();

            return Ok(new { MechanicId = newMechanic.MechanicID, Message = "Mechanic signed up successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }

        try
        {
            string email = formData.GetProperty("email").GetString();
            string password = formData.GetProperty("password").GetString();

            var mechanic = _context.Mechanics.FirstOrDefault(m => m.MechanicEmail == email);

            if (mechanic == null)
            {
                return NotFound("Mechanic not found");
            }

            bool passwordsMatch = BCrypt.Net.BCrypt.Verify(password, mechanic.MechanicPassword);

            if (passwordsMatch)
            {
                return Ok(new { MechanicId = mechanic.MechanicID, Message = "Mechanic logged in successfully" });
            }
            else
            {
                throw new Exception("Incorrect password for mechanic: " + mechanic.MechanicEmail);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateMechanic(int id, [FromBody] dynamic formData)
    {
        try
        {
            var existingMechanic = _context.Mechanics.Find(id);

            if (existingMechanic == null)
            {
                return NotFound("Mechanic not found");
            }

            existingMechanic.MechanicName = formData.GetProperty("name").GetString();
            existingMechanic.MechanicEmail = formData.GetProperty("email").GetString();
            existingMechanic.MechanicPassword = BCrypt.Net.BCrypt.HashPassword(formData.GetProperty("password").GetString());
            existingMechanic.MechanicAddress = formData.GetProperty("address").GetString();
            existingMechanic.MechanicPhone = formData.GetProperty("phone").GetString();

            _context.SaveChanges();

            return Ok(existingMechanic);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("ratings/{id}")]
    public IActionResult GetRatings(int id)
    {
        try
        {
            var mechanic = _context.Mechanics.Find(id);

            if (mechanic == null)
            {
                return NotFound("Mechanic not found");
            }

            double averageRating = _context.MechanicRatings.Where(r => r.MechanicID == id).Average(r => r.Rating);

            return Ok(new { MechanicId = mechanic.MechanicID, AverageRating = averageRating });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("ratings/{id}")]
    public IActionResult GiveRating(int id, [FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }

        try
        {
            var mechanic = _context.Mechanics.Find(id);

            if (mechanic == null)
            {
                return NotFound("Mechanic not found");
            }

            var newRating = new MechanicRating
            {
                MechanicID = id,
                Rating = formData.GetProperty("rating").GetDouble(),
                Review = formData.GetProperty("review").GetString()
            };

            _context.MechanicRatings.Add(newRating);
            _context.SaveChanges();

            return Ok(new { MechanicId = id, Message = "Rating added successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
