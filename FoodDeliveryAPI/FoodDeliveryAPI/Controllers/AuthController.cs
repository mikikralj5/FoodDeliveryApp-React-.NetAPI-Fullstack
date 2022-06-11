using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FoodDeliveryAPI.DTOs;
using FoodDeliveryAPI.Helpers;
using FoodDeliveryAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DeliveryContext _context;
        private readonly JwtService _jwtService;

        public AuthController(DeliveryContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }


        [HttpPost]
        [Route("Register")]
        [Consumes("application/json")]
        //[Produces("application/json")]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterDto dtoUser)
        {
            if (UserExists(dtoUser.Username))
            {

                return BadRequest(new { mess = "vec postoji" });
            }


            User newUser = new User
            {
                Username = dtoUser.Username,
                Password = dtoUser.Password,
                Role = dtoUser.Role
            };

            newUser.Verified = "PENDING";
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { mess = "napravljen" });

        }

        [HttpPost]
        [Route("Login")]
       
        public IActionResult Login([FromBody] LoginDto userLogin)
        {
            User userTemp = _context.Users.Where(b => b.Username == userLogin.Username && b.Password == userLogin.Password).FirstOrDefault();
            if(userTemp == null)
            {
                return NotFound("User not found");
            }

            var token = _jwtService.GenerateToken(userTemp);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(token);
        }

        [HttpGet("GetUser")]
        [Authorize(Roles = "Consumer")]
        public IActionResult GetUser()
        {
            //var jwt = Request.Cookies["jwt"];

            //var token = _jwtService.Verify(jwt);

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;




            return Ok(username);
        }


    
        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Username == id);
        }

       

       
    }
}
