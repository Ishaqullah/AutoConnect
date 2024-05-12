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

    [HttpGet("{id}")]
     public IActionResult GetMechanicsById(int id)
{
    try
    {
        var mechanic = _context.Mechanics.Find(id);

        if (mechanic == null)
        {
            return NotFound($"Mechanic with ID {id} not found");
        }

        // Create a new object to hold mechanic information
        var mechanicInfo = new
        {
            Name = mechanic.MechanicName,
            Email = mechanic.MechanicEmail,
            Address = mechanic.MechanicAddress ?? null, // If Address is null, set it to null
            Phone = mechanic.MechanicPhone ?? null,
            avgRating=mechanic.AverageRating
        };

        return Ok(mechanicInfo);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
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
                // Calculate the average rating for the current mechanic
                var ratings = _context.MechanicRatings
                .Where(r => r.MechanicID == mechanic.MechanicID)
                .Select(r => r.Rating)
                .ToList(); // Materialize the ratings

                double averageRating = ratings.Any() ? ratings.Average() : 0; // Calculate average
                int numberOfReviews = ratings.Count();
                // Create the mechanic detail object with the average rating
                var mechanicDetail = new
                {
                    MechanicId = mechanic.MechanicID,
                    MechanicName = mechanic.MechanicName,
                    MechanicEmail = mechanic.MechanicEmail,
                    MechanicPhone = mechanic.MechanicPhone,
                    MechanicAddress = mechanic.MechanicAddress,
                    AverageRating = averageRating,
                    NumberOfReviews = numberOfReviews // Assign the calculated average rating
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

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteMechanic(int id)
    {
        try
        {
            var mechanic = _context.Mechanics.Find(id);

            if (mechanic == null)
            {
                return NotFound($"Mechanic with ID {id} not found");
            }

            // Delete associated ratings
            var ratings = _context.MechanicRatings.Where(r => r.MechanicID == id).ToList();
            _context.MechanicRatings.RemoveRange(ratings);

            // Delete the mechanic
            _context.Mechanics.Remove(mechanic);

            _context.SaveChanges();

            return Ok($"Mechanic with ID {id} and associated ratings deleted successfully");
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
    [HttpDelete("delete-ratings/{id}")]
    public IActionResult DeleteRating(int id)
    {
        try
        {
            var rating = _context.MechanicRatings.Find(id);

            if (rating == null)
            {
                return NotFound($"Rating with ID {id} not found");
            }

            _context.MechanicRatings.Remove(rating);
            _context.SaveChanges();

            return Ok($"Rating with ID {id} deleted successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpGet("all-ratings")]
    public IActionResult GetAllMechanicRatingsWithUserEmail()
    {
        try
        {
            var mechanicRatings = _context.MechanicRatings.Include(r => r.Mechanic).ToList();
            var ratingsWithUserEmail = new List<object>();

            foreach (var rating in mechanicRatings)
            {
                var user = _context.Users.FirstOrDefault(u => u.UserID == rating.UserID);
                var userEmail = user != null ? user.UserEmail : "Unknown"; // If user is not found, set email to "Unknown"

                var ratingDetail = new
                {
                    RatingId = rating.MechanicRatingID,
                    MechanicId = rating.MechanicID,
                    MechanicName = rating.Mechanic.MechanicName,
                    Rating = rating.Rating,
                    Review = rating.Review,
                    UserEmail = userEmail
                };

                ratingsWithUserEmail.Add(ratingDetail);
            }

            return Ok(ratingsWithUserEmail);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpPost("ratings/{id}/{userId}")]
    public IActionResult GiveRating(int id,int userId, [FromBody] dynamic formData)
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
                Rating = (int)formData.GetProperty("rating").GetDouble(),
                UserID = userId,
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
    [HttpGet("ratings-reviews/{id}")]
public IActionResult GetMechanicRatingReviews(int id)
{
    try
    {
        // Find the mechanic
        var mechanic = _context.Mechanics.Find(id);

        if (mechanic == null)
        {
            return NotFound("Mechanic not found");
        }

        // Retrieve all ratings and reviews for the mechanic
        var ratingsReviews = _context.MechanicRatings
            .Include(r => r.User) // Include user details
            .Where(r => r.MechanicID == id)
            .Select(r => new
            {
                Rating = r.Rating,
                Review = r.Review,
                User = new
                {
                    UserId = r.User.UserID,
                    UserName = r.User.UserName,
                    UserEmail = r.User.UserEmail
                    // Add other user details as needed
                }
            })
            .ToList();

        return Ok(ratingsReviews);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

[HttpGet("appointments/{mechanicId}")]
public IActionResult GetAppointmentsByMechanicId(int mechanicId)
{
    try
    {
        // Find all appointments for the specified mechanic
        var appointments = _context.Appointments
            .Where(a => a.MechanicID == mechanicId)
            .Include(a => a.Buyer) // Include Buyer navigation property
            .ToList();

        // Map appointments to DTOs to include user email and phone
        var appointmentsDTO = appointments.Select(a => new
        {
            AppointmentId = a.AppointmentID,
            UserId = a.Buyer.UserID,
            UserEmail = _context.Users.FirstOrDefault(u => u.UserID == a.Buyer.UserID)?.UserEmail,
            UserPhone = _context.Users.FirstOrDefault(u => u.UserID == a.Buyer.UserID)?.UserPhone,
            AppointmentDate = a.DateAndTime,
            AppointmentStatus = a.Status
        });

        return Ok(appointmentsDTO);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}
[HttpPut("appointments/{appointmentId}")]
public IActionResult UpdateAppointmentStatus(int appointmentId, [FromBody] dynamic formData)
{
    try
    {
        // Find the appointment by ID
        var appointment = _context.Appointments.Find(appointmentId);

        if (appointment == null)
        {
            return NotFound($"Appointment with ID {appointmentId} not found");
        }

        // Update the status of the appointment
        appointment.Status = formData.GetProperty("status").GetString();

        // Save changes to the database
        _context.SaveChanges();

        return Ok($"Appointment with ID {appointmentId} updated successfully");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

}
