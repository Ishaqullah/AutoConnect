using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[EnableCors("AllowAll")]
[Route("[controller]")]
[ApiController]
public class VehiclesController : ControllerBase
{
    private readonly AppDbContext _context;

    public VehiclesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetEmployees()
    {
        return await _context.Vehicles.ToListAsync();
    }

    [HttpPost("submitVehicles")]
    public IActionResult SubmitVehicles([FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }
        Console.WriteLine(formData.GetProperty("images"));
        try
        {
            var newVehicle = new Vehicle
            {
                VehicleCity = formData.GetPropertyy("selectedCity"),
                VehicleRegistrationYear = formData.GetPropertyy("registeredYear"),
                VehicleModelYear = formData.GetPropertyy("modelYear"),
                VehicleImages = formData.GetProperty("images"),
                VehicleRegistrationCity = formData.GetPropertyy("registeredCity"),
                Colour = formData.GetPropertyy("color"),
                Make = formData.GetPropertyy("make"),
                Model = formData.GetPropertyy("model"),
                Variant = formData.GetPropertyy("variant"),
                Mileage = int.Parse(formData.GetPropertyy("mileage")),
                Price = float.Parse(formData.GetPropertyy("price")),
                Description = formData.GetPropertyy("description"),
                BodyType = formData.GetPropertyy("bodyType"),
                EngineCapacity= formData.GetProperty("engineCapacity"),
                Features = formData.GetProperty("features"),
                EngineTransmission = formData.GetPropertyy("engineTransmission"),
                Assembly = formData.GetPropertyy("assembly"),
                MinPrice = float.Parse(formData.GetPropertyy("minPrice")),
                MaxPrice = float.Parse(formData.GetPropertyy("maxPrice"))
            };

            _context.Vehicles.Add(newVehicle);
            _context.SaveChanges();

            return Ok("Vehicle submitted successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}