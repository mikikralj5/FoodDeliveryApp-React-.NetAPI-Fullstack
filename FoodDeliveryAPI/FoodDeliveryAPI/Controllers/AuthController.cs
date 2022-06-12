using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FoodDeliveryAPI.DTOs;
using FoodDeliveryAPI.Helpers;
using FoodDeliveryAPI.Models;
using FoodDeliveryAPI.Repository;
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
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly IMapper _mapper;

        public AuthController(IUserRepository userRepository, JwtService jwtService, IMapper mapper)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _mapper = mapper;
        }


        [HttpPost]
        [Route("Register")]
        [Consumes("application/json")]
        //[Produces("application/json")]
        public IActionResult RegisterUser([FromBody] RegisterDto dtoUser)
        {
            if (_userRepository.UserExists(dtoUser.Username))
            {

                return BadRequest(new { mess = "vec postoji" });
            }


            User newUser = _mapper.Map<User>(dtoUser);

            newUser.Verified = "PENDING";
             _userRepository.AddUser(newUser);

            return Ok(new { mess = "napravljen" });

        }

        [HttpPost]
        [Route("Login")]
       
        public IActionResult Login([FromBody] LoginDto userLogin)
        {
            

            User userTemp = _userRepository.GetByUsername(userLogin.Username);
            if(userTemp == null)
            {
                return NotFound("User not found");
            }

            if(userTemp.Password != userLogin.Password)
            {
                return NotFound("Wrong password");
            }

            var token = _jwtService.GenerateToken(userTemp);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(token);
        }

        [HttpGet("GetUserProfile")]
        [Authorize(Roles = "Consumer")]
        public IActionResult GetUserProfile()
        {
            
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            return Ok(_mapper.Map<UserProfileDto>(user));
        }

        [HttpPut("UpdateUserProfile")]
        public IActionResult UpdateUserProfile([FromBody] UserProfileDto userProfileDto)
        {

            User user = _mapper.Map<User>(userProfileDto);
            _userRepository.UpdateUser(user);
    
            return Ok("updated");
        }








    }
}
