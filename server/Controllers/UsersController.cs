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
                UserName=formData.GetProperty("name").GetString(),
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
                return Ok(new { UserId = userWithEmailPass.UserID,name=userWithEmailPass.UserName, Message = "User logged in successfully" });
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

        // Find all mechanic ratings associated with the user
        var mechanicRatings = _context.MechanicRatings.Where(m => m.UserID == id).ToList();

        // Remove the mechanic ratings
        _context.MechanicRatings.RemoveRange(mechanicRatings);

        // Find all feedback associated with the user
        var userFeedbacks = _context.Feedbacks.Where(f => f.UserID == id).ToList();

        // Remove the feedbacks
        _context.Feedbacks.RemoveRange(userFeedbacks);

        // Remove the user
        _context.Users.Remove(user);
        
        _context.SaveChanges();

        return Ok($"User with ID {id} and associated data deleted successfully");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}



[HttpPost("feedback/{id}")]
public IActionResult SaveFeedback(int id,[FromBody] dynamic formData)
{
    if (formData.ValueKind == JsonValueKind.Null)
    {
        return BadRequest("Invalid data");
    }

    try
    {
        int userId = id;
        string feedback = formData.GetProperty("feedback").GetString();
        int rating = formData.GetProperty("rating").GetInt32();

        // Check if the user exists
        var user = _context.Users.Find(userId);
        if (user == null)
        {
            return NotFound($"User with ID {userId} not found");
        }

        // Save feedback
        var newFeedback = new Feedback
        {
            UserID = userId,
            feedback = feedback,
            rating = rating
        };

        _context.Feedbacks.Add(newFeedback);
        _context.SaveChanges();

        return Ok("Feedback saved successfully");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}
[HttpPost("appointment/{id}/{mechanicId}")]
public IActionResult CreateAppointment(int id,int mechanicId,[FromBody] dynamic formData)
{
    if (formData.ValueKind == JsonValueKind.Null)
    {
        return BadRequest("Invalid data");
    }

    try
    {
        // Extract data from the request body
        int userId = id;
        int mId = mechanicId;
        string appointmentDate = formData.GetProperty("appointmentDate").GetString();
        string status = formData.GetProperty("status").GetString();

        // Check if the user and mechanic exist
        var user = _context.Users.Find(userId);
        var mechanic = _context.Mechanics.Find(mechanicId);
        
        if (user == null || mechanic == null)
        {
            return NotFound("User or mechanic not found");
        }

        // Create a new appointment
        var newAppointment = new Appointment
        {
            BuyerID = userId,
            MechanicID = mechanicId,
            DateAndTime= appointmentDate,
            Status = status
        };

        _context.Appointments.Add(newAppointment);
        _context.SaveChanges();

        return Ok("Appointment created successfully");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

[HttpGet("appointmentStatus/{userId}/{mechanicId}")]
    public IActionResult GetAppointmentStatus(int userId, int mechanicId)
    {
        try
        {
            // Check if the user and mechanic exist
            var user = _context.Users.Find(userId);
            var mechanic = _context.Mechanics.Find(mechanicId);

            if (user == null || mechanic == null)
            {
                return NotFound("User or mechanic not found");
            }

            // Find the appointment for the specified user and mechanic
            var appointment = _context.Appointments
                .FirstOrDefault(a => a.BuyerID == userId && a.MechanicID == mechanicId);

            if (appointment == null)
            {
                return NotFound("Appointment not found for the specified user and mechanic");
            }

            // Return the status of the appointment
            return Ok(new { AppointmentStatus = appointment.Status ,AppointmentDate=appointment.DateAndTime});
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
[HttpDelete("appointment/{userId}/{mechanicId}")]
public IActionResult DeleteAppointment(int userId, int mechanicId)
{
    try
    {
        // Find the appointment for the specified user and mechanic
        var appointment = _context.Appointments
            .FirstOrDefault(a => a.BuyerID == userId && a.MechanicID == mechanicId);

        if (appointment == null)
        {
            return NotFound("Appointment not found for the specified user and mechanic");
        }

        // Remove the appointment
        _context.Appointments.Remove(appointment);
        _context.SaveChanges();

        return Ok("Appointment deleted successfully");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}


}