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
}