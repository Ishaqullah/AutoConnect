using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Migrations;

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


    [HttpGet("getAdvertiseIdByVehicleId/{vehicleId}")]
    public IActionResult GetAdvertiseIdByVehicleId(int vehicleId)
    {
        // Console.WriteLine("this is"+vehicleId);
        var advertiseId = _context.Advertises
          .Where(a => a.VehicleID == vehicleId)
          .Select(a => a.AdvertiseID)
          .FirstOrDefault();


        return Ok(advertiseId);
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

    [HttpGet("adDetails/{id}")]
    public IActionResult GetAdDetails(int id)
    {
        var adDetails = _context.Advertises
            .Where(a => a.AdvertiseID == id)
            .Join(
                _context.Vehicles,
                advertise => advertise.VehicleID,
                vehicle => vehicle.VehicleID,
                (advertise, vehicle) => new
                {
                    AdvertiseID = advertise.AdvertiseID,
                    AdvertiseName = advertise.AdvertiseName,
                    SellerID = advertise.SellerID,
                    VehicleID = vehicle.VehicleID,
                    VehicleImages = vehicle.VehicleImages,
                    VehicleCity = vehicle.VehicleCity,
                    VehicleRegistrationYear = vehicle.VehicleRegistrationYear,
                    VehicleModelYear = vehicle.VehicleModelYear,
                    VehicleRegistrationCity = vehicle.VehicleRegistrationCity,
                    Mileage = vehicle.Mileage,
                    Make = vehicle.Make,
                    Model = vehicle.Model,
                    Variant = vehicle.Variant,
                    Colour = vehicle.Colour,
                    BodyType = vehicle.BodyType,
                    EngineCapacity = vehicle.EngineCapacity,
                    EngineTransmission = vehicle.EngineTransmission,
                    Features = vehicle.Features,
                    Assembly = vehicle.Assembly,
                    MinPrice = vehicle.MinPrice,
                    MaxPrice = vehicle.MaxPrice,
                    Price = vehicle.Price,
                    Description = vehicle.Description,
                    Seller = _context.Sellers
                        .Where(seller => seller.SellerID == advertise.SellerID)
                        .Join(
                            _context.Users,
                            seller => seller.UserID,
                            user => user.UserID,
                            (seller, user) => new
                            {
                                SellerID = seller.SellerID,
                                UserID = user.UserID,
                                UserName = user.UserName,
                                UserEmail = user.UserEmail,
                                UserPhone = user.UserPhone,
                                UserAddress=user.UserAddress
                            }
                        )
                        .FirstOrDefault()
                })
            .FirstOrDefault();

        if (adDetails == null)
        {
            return NotFound($"Advertise not found for ID {id}");
        }

        return Ok(adDetails);
    }


    [HttpGet("isSavedAd/{advertiseId}")]
    public IActionResult GetBuyerIdByAdId(int advertiseId)
    {
        var buyerId = _context.SavedAds
            .Where(sa => sa.AdId==advertiseId)
            .Select(sa => sa.BuyerId)
            .FirstOrDefault();

        if (buyerId != default(int))
        {
            return Ok(buyerId);
        }
        else
        {
            return NotFound("Buyer Id not found"); // Return 404 if ad_id is not found
        }
    }


    [HttpDelete("user/{id}/adId/{advertiseId}")]
    public IActionResult DeleteSavedAd(int id, int advertiseId)
    {
        var savedAd = _context.SavedAds
            .FirstOrDefault(sa => sa.BuyerId == id && sa.AdId == advertiseId);

        if (savedAd == null)
        {
            return NotFound(); // Return 404 if no matching record is found
        }

        _context.SavedAds.Remove(savedAd);
        _context.SaveChanges();

        return NoContent(); // Return 204 No Content on successful deletion
    }

    [HttpGet("savedAdsDetails/{id}")]
    public IActionResult GetAdDetailsForBuyer(int id)
    {
        var adDetails = _context.SavedAds
            .Where(sa => sa.BuyerId == id )
            .Join(
                _context.Advertises,
                sa => sa.AdId,
                ad => ad.AdvertiseID,
                (sa, ad) => new 
                {
                    ad.AdvertiseID,
                    ad.AdvertiseName,
                    ad.VehicleID,
                    ad.SellerID,
                }
            )
            .ToList();

        if (adDetails != null)
        {
            return Ok(adDetails);
        }
        else
        {
            return NotFound(); // Return 404 if no matching record is found
        }
    }

    [HttpPost("savedAds/{advertiseId}")]
    public async Task<IActionResult> SaveAd(int advertiseId, [FromBody] dynamic BuyerId)
    {

        if (BuyerId.ValueKind == JsonValueKind.Null)
        {
            return BadRequest("Invalid data");
        }

        Console.WriteLine("Buyer id is "+ int.Parse(BuyerId.GetProperty("id").GetString()) + "and ad id is " + advertiseId);
        try{
        // Ensure that the specified Ad and Buyer exist
        var ad = await _context.Advertises.FindAsync(advertiseId);
        if (ad == null)
        {
            return NotFound($"Ad with id {advertiseId} not found.");
        }
        var buyerId=int.Parse(BuyerId.GetProperty("id").GetString());
        var buyer = await _context.Buyers.FindAsync(int.Parse(BuyerId.GetProperty("id").GetString()));
        if (buyer == null)
        {
            return NotFound($"Buyer with id {buyerId} not found.");
        }

        // Create a new SavedAd entry
        var savedAd = new SavedAds
        {
            AdId = advertiseId,
            BuyerId = int.Parse(BuyerId.GetProperty("id").GetString()),
            // You can add additional properties if needed
        };

        // Add to the context and save changes
        _context.SavedAds.Add(savedAd);
        _context.SaveChanges();

        return Ok("Advertise saved successfully");
        }
        catch(Exception ex){
            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }



    [HttpPost("submitAdvertises/{id}")]
    public IActionResult SubmitAdvertises(int id, [FromBody] dynamic formData)
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
            var Advertise = new Advertise
            {
                AdvertiseName = formData.GetProperty("make").GetString() + " " + formData.GetProperty("model").GetString() + " " + formData.GetProperty("variant").GetString(),
                SellerID = _context.Sellers.Where(s => s.UserID == id).Select(s => s.SellerID).FirstOrDefault(),
                Vehicle = new Vehicle
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