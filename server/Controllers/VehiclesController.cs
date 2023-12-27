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
    public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
    {
        return await _context.Vehicles.ToListAsync();
    }

    [HttpPut("updateVehicle/{id}")]
    public IActionResult UpdateVehicle(int id, [FromBody] dynamic formData)
    {
        var existingVehicle = _context.Vehicles.Find(id);

        if (existingVehicle == null)
        {
            return NotFound($"Vehicle with ID {id} not found");
        }

        Console.WriteLine($"VehicleImages: {formData.GetProperty("images").GetString()}");
        Console.WriteLine($"VehicleCity: {formData.GetProperty("selectedCity").GetString()}");
        Console.WriteLine($"VehicleRegistrationYear: {formData.GetProperty("registeredYear").GetString()}");
        Console.WriteLine($"VehicleModelYear: {formData.GetProperty("modelYear").GetString()}");
        Console.WriteLine($"VehicleRegistrationCity: {formData.GetProperty("registeredCity").GetString()}");
        // Console.WriteLine($"Mileage: {int.Parse(formData.GetProperty("mileage").GetString())}");
        Console.WriteLine($"Make: {formData.GetProperty("make").GetString()}");
        Console.WriteLine($"Model: {formData.GetProperty("model").GetString()}");
        Console.WriteLine($"Variant: {formData.GetProperty("variant").GetString()}");
        Console.WriteLine($"Colour: {formData.GetProperty("color").GetString()}");
        Console.WriteLine($"BodyType: {formData.GetProperty("bodyType").GetString()}");
        Console.WriteLine($"EngineCapacity: {formData.GetProperty("engineCapacity").GetString()}");
        Console.WriteLine($"EngineTransmission: {formData.GetProperty("engineTransmission").GetString()}");
        Console.WriteLine($"Features: {formData.GetProperty("features").GetString()}");
        Console.WriteLine($"Assembly: {formData.GetProperty("assembly").GetString()}");
        // Console.WriteLine($"MinPrice: {float.Parse(formData.GetProperty("minPrice").GetString())}");
        // Console.WriteLine($"MaxPrice: {float.Parse(formData.GetProperty("maxPrice").GetString())}");
        // Console.WriteLine($"Price: {float.Parse(formData.GetProperty("price").GetString())}");
        Console.WriteLine($"Description: {formData.GetProperty("description").GetString()}");

        existingVehicle.VehicleImages = formData.GetProperty("images")?.GetString() ?? "";
        existingVehicle.VehicleCity = formData.GetProperty("selectedCity")?.GetString() ?? "";
        existingVehicle.VehicleRegistrationYear = formData.GetProperty("registeredYear")?.GetString() ?? "";
        existingVehicle.VehicleModelYear = formData.GetProperty("modelYear")?.GetString() ?? "";
        existingVehicle.VehicleRegistrationCity = formData.GetProperty("registeredCity")?.GetString() ?? "";

        // existingVehicle.Mileage = formData.GetProperty("mileage")?.GetInt32() ?? 0;

        existingVehicle.Make = formData.GetProperty("make")?.GetString() ?? "";
        existingVehicle.Model = formData.GetProperty("model")?.GetString() ?? "";
        existingVehicle.Variant = formData.GetProperty("variant")?.GetString() ?? "";
        existingVehicle.Colour = formData.GetProperty("color")?.GetString() ?? "";
        existingVehicle.BodyType = formData.GetProperty("bodyType")?.GetString() ?? "";
        existingVehicle.EngineCapacity = formData.GetProperty("engineCapacity")?.GetString() ?? "";
        existingVehicle.EngineTransmission = formData.GetProperty("engineTransmission")?.GetString() ?? "";
        existingVehicle.Features = formData.GetProperty("features")?.GetString() ?? "";
        existingVehicle.Assembly = formData.GetProperty("assembly")?.GetString() ?? "";

        // existingVehicle.MinPrice = formData.GetProperty("minPrice")?.GetSingle() ?? 0.0f;
        // existingVehicle.MaxPrice = formData.GetProperty("maxPrice")?.GetSingle() ?? 0.0f;


        float tempPrice;
        if (float.TryParse(formData.GetProperty("price")?.GetString(), out tempPrice))
        {
            existingVehicle.Price = tempPrice;
        }


        float tempMaxPrice;
        if (float.TryParse(formData.GetProperty("maxPrice")?.GetString(), out tempMaxPrice))
        {
            existingVehicle.MaxPrice = tempMaxPrice;
        }

        float tempMinPrice;
        if (float.TryParse(formData.GetProperty("minPrice")?.GetString(), out tempMinPrice))
        {
            existingVehicle.MinPrice = tempMinPrice;
        }

        int tempMileage;
        if (int.TryParse(formData.GetProperty("mileage")?.GetString(), out tempMileage))
        {
            existingVehicle.Mileage = tempMileage;
        }



        existingVehicle.Description = formData.GetProperty("description")?.GetString() ?? "";




        _context.SaveChanges();

        return Ok("Vehicle updated successfully");
    }


    // [HttpGet("getVehicle/{id}")]
    // public IActionResult GetVehiclesId(int id)
    // {
    //     var seller = _context.Sellers.FirstOrDefault(s => s.UserID == id);

    //     if (seller == null)
    //     {
    //         return NotFound($"Seller not found for user ID {id}");
    //     }

    //     var vehicleIds = _context.Advertises
    //     .Where(a => a.SellerID == seller.SellerID)
    //     .Select(a => a.VehicleID)
    //     .ToList();

    //     var vehicles = _context.Vehicles
    //     .Where(v => vehicleIds.Contains(v.VehicleID))
    //     .ToList();

    //     return Ok(vehicles);
    // }

    [HttpPost("submitVehicles/{id}")]
    public IActionResult SubmitVehicles(int id, [FromBody] dynamic formData)
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
            var newVehicle = new Vehicle
            {
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
                EngineCapacity = formData.GetProperty("engineCapacity").GetString(),
                EngineTransmission = formData.GetProperty("engineTransmission").GetString(),
                Features = formData.GetProperty("features").GetString(),
                Assembly = formData.GetProperty("assembly").GetString(),
                MinPrice = float.Parse(formData.GetProperty("minPrice").GetString()),
                MaxPrice = float.Parse(formData.GetProperty("maxPrice").GetString()),
                Price = float.Parse(formData.GetProperty("price").GetString()),
                Description = formData.GetProperty("description").GetString(),
                Advertise = new Advertise
                {
                    AdvertiseName = formData.GetProperty("make").GetString() + " " + formData.GetProperty("model").GetString() + " " + formData.GetProperty("variant").GetString(),
                    SellerID = _context.Sellers.Where(s => s.UserID == id).Select(s => s.SellerID).FirstOrDefault(),
                }
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