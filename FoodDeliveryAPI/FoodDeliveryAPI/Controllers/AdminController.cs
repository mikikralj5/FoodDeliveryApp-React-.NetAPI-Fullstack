using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FoodDeliveryAPI.DTOs;
using FoodDeliveryAPI.DTOs.Product;
using FoodDeliveryAPI.DTOs.User;
using FoodDeliveryAPI.Helpers;
using FoodDeliveryAPI.Models;
using FoodDeliveryAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/Admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        private readonly IMapper _mapper;

       
        private readonly IProductRepository _productRepository;

        private readonly IOrderRepository _orderRepository;

        public AdminController(IUserRepository userRepository, IProductRepository productRepository, IMapper mapper, IOrderRepository orderRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;          
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        [HttpPost("VerifyUser")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult VerifyUser([FromBody] VerifyUserDto verifyUserDto)
        {
            _userRepository.VerifyUser(verifyUserDto.Username, verifyUserDto.State);

            return Ok("verifikovan");
        }

        [HttpGet("GetUnverifiedDeliverers")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult GetUnverifiedDeliverers()
        {
            return Ok(_mapper.Map<List<UserProfileDto>>(_userRepository.GetUnverifiedDeliverers()));
        }

        [HttpGet("GetVerifiedOrDeclinedDeliverers")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult GetVerifiedOrDeclinedDeliverers()
        {
            return Ok(_mapper.Map<List<UserProfileDto>>(_userRepository.GetVerifiedDeliverers()));
        }


        [HttpPost("AddProduct")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult AddProduct([FromBody] ProductDto productDto)
        {
            Product product = _mapper.Map<Product>(productDto);

            try
            {
                _productRepository.AddProduct(product);
            }
            catch
            {
                return BadRequest("Failed to add a product, populate all the fields corectly");
            }
           

          
            return Ok("proizvod dodat");
        }

        [HttpPost("DeleteProduct/{id}")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult DeleteProduct(string id)
        {
           

            _productRepository.DeleteProduct(id);

            return Ok("Deleted product");
        }


        [HttpGet("GetAllOrders")]
        [Authorize(Roles = "ADMIN")]
        public IActionResult GetAllOrders()
        {
            return Ok(_orderRepository.GetFinishedAndInProgress());
        }




    }
}
