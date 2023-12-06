using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[EnableCors("AllowAll")]
[Route("[controller]")]
[ApiController]
public class AdvertisesController : ControllerBase
{
    private readonly AppDbContext _context;
    public AdvertisesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Advertise>>> GetAdvertises()
    {
        return await _context.Advertises.ToListAsync();
    }

    [HttpGet("myAds/{id}")]
    public IActionResult GetAdvertisesId(int id)
    {
        var seller = _context.Sellers.FirstOrDefault(s => s.UserID == id);

        if (seller == null)
        {
            return NotFound($"Seller not found for user ID {id}");
        }

        var allAdvertises = _context.Advertises
        .Where(a => a.SellerID == seller.SellerID)
        .Select(a => new
        {
            a.AdvertiseID,
            a.AdvertiseName,
            a.VehicleID,
            a.SellerID,
        }).ToList();

        return Ok(allAdvertises);
    }

    [HttpDelete("deleteVehicle/{id}")]
    public IActionResult DeleteAdvertise(int id)
    {
        var advertise = _context.Advertises
            .Include(a => a.Vehicle)
            .FirstOrDefault(a => a.AdvertiseID == id);

        if (advertise == null)
        {
            return NotFound($"Advertise not found for ID {id}");
        }

        var vehicleId = advertise.VehicleID;

        if (vehicleId != null)
        {
            var vehicle = _context.Vehicles
                .FirstOrDefault(v => v.VehicleID == vehicleId);

            if (vehicle != null)
            {
                _context.Vehicles.Remove(vehicle);
            }
        }

        _context.Advertises.Remove(advertise);
        _context.SaveChanges();

        return Ok($"Advertise with ID {id} and related Vehicle deleted successfully.");
    }


    [HttpGet("getVehicles/{id}")]
    public IActionResult GetVehiclesThroughAdvertiseID(int id)
    {
        Console.WriteLine(id);
        var advertise = _context.Advertises.FirstOrDefault(s => s.AdvertiseID == id);

        if (advertise == null)
        {
            return NotFound($"Advertise not found for advertise ID {id}");
        }

        var vehicleDetails = _context.Vehicles
    .Where(v => v.VehicleID == advertise.VehicleID)
    .Select(v => new
    {
        v.VehicleID,
        v.VehicleImages,
        v.VehicleCity,
        v.VehicleRegistrationYear,
        v.VehicleModelYear,
        v.VehicleRegistrationCity,
        v.Mileage,
        v.Make,
        v.Model,
        v.Variant,
        v.Colour,
        v.BodyType,
        v.EngineCapacity,
        v.EngineTransmission,
        v.Features,
        v.Assembly,
        v.MaxPrice,
        v.MinPrice,
        v.Price,
        v.Description
    })
    .FirstOrDefault();

        return Ok(vehicleDetails);
    }


    [HttpPost("submitAdvertises/{id}")]
    public IActionResult SubmitAdvertises(int id,[FromBody] dynamic formData)
    {
        if (formData.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }

        Console.WriteLine($"VehicleImages: {formData.GetProperty("images").GetString()}");
        Console.WriteLine($"VehicleCity: {formData.GetProperty("selectedCity").GetString()}");
        Console.WriteLine($"VehicleRegistrationYear: {formData.GetProperty("registeredYear").GetString()}");
        Console.WriteLine($"VehicleModelYear: {formData.GetProperty("modelYear").GetString()}");
        Console.WriteLine($"VehicleRegistrationCity: {formData.GetProperty("registeredCity").GetString()}");
        Console.WriteLine($"Mileage: {int.Parse(formData.GetProperty("mileage").GetString())}");
        Console.WriteLine($"Make: {formData.GetProperty("make").GetString()}");
        Console.WriteLine($"Model: {formData.GetProperty("model").GetString()}");
        Console.WriteLine($"Variant: {formData.GetProperty("variant").GetString()}");
        Console.WriteLine($"Colour: {formData.GetProperty("color").GetString()}");
        Console.WriteLine($"BodyType: {formData.GetProperty("bodyType").GetString()}");
        Console.WriteLine($"EngineCapacity: {formData.GetProperty("engineCapacity").GetString()}");
        Console.WriteLine($"EngineTransmission: {formData.GetProperty("engineTransmission").GetString()}");
        Console.WriteLine($"Features: {formData.GetProperty("features").GetString()}");
        Console.WriteLine($"Assembly: {formData.GetProperty("assembly").GetString()}");
        Console.WriteLine($"MinPrice: {float.Parse(formData.GetProperty("minPrice").GetString())}");
        Console.WriteLine($"MaxPrice: {float.Parse(formData.GetProperty("maxPrice").GetString())}");
        Console.WriteLine($"Price: {float.Parse(formData.GetProperty("price").GetString())}");
        Console.WriteLine($"Description: {formData.GetProperty("description").GetString()}");

        try
        {
            var Advertise = new Advertise{
                AdvertiseName= formData.GetProperty("make").GetString() + " " + formData.GetProperty("model").GetString()+" " + formData.GetProperty("variant").GetString(),
                SellerID = _context.Sellers.Where(s => s.UserID == id).Select(s => s.SellerID).FirstOrDefault(),
                Vehicle = new Vehicle{
                    VehicleImages = formData.GetProperty("images").GetString(),
                    VehicleCity = formData.GetProperty("selectedCity").GetString(),
                    VehicleRegistrationYear = formData.GetProperty("registeredYear").GetString(),
                    VehicleModelYear = formData.GetProperty("modelYear").GetString(),
                    VehicleRegistrationCity = formData.GetProperty("registeredCity").GetString(),
                    Mileage = int.Parse(formData.GetProperty("mileage").GetString()),
                    Make = formData.GetProperty("make").GetString(),
                    Model = formData.GetProperty("model").GetString(),
                    Variant = formData.GetProperty("variant").GetString(),
                    Colour = formData.GetProperty("color").GetString(),
                    BodyType = formData.GetProperty("bodyType").GetString(),
                    EngineCapacity= formData.GetProperty("engineCapacity").GetString(),
                    EngineTransmission = formData.GetProperty("engineTransmission").GetString(),
                    Features = formData.GetProperty("features").GetString(),
                    Assembly = formData.GetProperty("assembly").GetString(),
                    MinPrice = float.Parse(formData.GetProperty("minPrice").GetString()),
                    MaxPrice = float.Parse(formData.GetProperty("maxPrice").GetString()),
                    Price = float.Parse(formData.GetProperty("price").GetString()),
                    Description = formData.GetProperty("description").GetString(),
                }
            };
            

            _context.Advertises.Add(Advertise);
            _context.SaveChanges();

            return Ok("Advertise submitted successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}