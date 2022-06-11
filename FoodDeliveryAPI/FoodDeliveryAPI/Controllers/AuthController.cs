using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodDeliveryAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DeliveryContext _context;

        public AuthController(DeliveryContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("Register")]
        //[Consumes("application/json")]
        //[Produces("application/json")]
        public async Task<ActionResult> RegisterUser([FromBody] User user)
        {
            if (UserExists(user.Username))
            {

                return BadRequest(new { mess = "vec postoji" });
            }


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { mess = "napravljen" });

        }

        public IActionResult Login(string username, string password)
        {
            return Ok();
        }


        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Username == id);
        }
    }
}
