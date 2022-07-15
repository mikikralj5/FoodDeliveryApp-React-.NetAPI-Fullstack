using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;

using FoodDeliveryAPI.DTOs.Order;
using FoodDeliveryAPI.Models;
using FoodDeliveryAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/Consumer")]
    [ApiController]
    public class ConsumerController : ControllerBase
    {
        private readonly DeliveryContext _context;

        private readonly IProductRepository _productRepository;

       
        private readonly IUserRepository _userRepository;

        private readonly IOrderRepository _orderRepository;

        private readonly IMapper _mapper;

        public ConsumerController(DeliveryContext context, IProductRepository productRepository,  IUserRepository userRepository,IMapper mapper, IOrderRepository orderRepository)
        {
            _context = context;
            _productRepository = productRepository;
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        [HttpGet("GetProducts")]
        [Authorize(Roles = "CONSUMER, ADMIN")]
        public IActionResult GetProducts()
        {
            return Ok(_productRepository.GetProducts());
        }

      
        [HttpPost("PlaceOrder")]
        [Authorize(Roles = "CONSUMER")]
        public IActionResult PlaceOrder([FromBody] NewOrderDto newOrderDto)
        {

            List<Product> orderProducts = _mapper.Map<List<Product>>(newOrderDto.Products);
            Order newOrder = new Order();
            newOrder.Products = new List<OrderItem>();
            foreach (var item in newOrderDto.Products)
            {             
                OrderItem orderItem = new OrderItem();
                orderItem.Product = _mapper.Map<Product>(item);
                orderItem.Amount = item.Amount;
                newOrder.Products.Add(orderItem);
            }

            newOrder.TotalPrice = newOrderDto.TotalPrice + 5;
            newOrder.OrderState = "PENDING";
            newOrder.OrderAddress = newOrderDto.OrderAddress;
            newOrder.Comment = newOrderDto.Comment;

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            if(user.ConsumerOrders == null)
            {
                user.ConsumerOrders = new List<Order>();
            }

            user.ConsumerOrders.Add(newOrder);

            _userRepository.UpdateUser(user);

            return Ok("order placed");
        }


        [HttpGet("GetCompletedOrdersByUser")]
        [Authorize(Roles = "CONSUMER")]
        public IActionResult GetCompletedOrdersByUser()
        {

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            foreach (var item in user.ConsumerOrders)
            {

                string userInput = item.DeliveryTime;
                var time = TimeSpan.Parse(userInput);
                var dateTime = DateTime.Today.Add(time);

                if (DateTime.Now > dateTime && item.OrderState != OrderState.FINISHED.ToString())
                {
                    item.OrderState = OrderState.FINISHED.ToString();
                }
            }

            _userRepository.UpdateUser(user);

            return Ok(_orderRepository.GetCompletedOrdersByUser(username));
        }

        [HttpGet("GetOrdersInProgress")]
        [Authorize(Roles = "CONSUMER")]
        public IActionResult GetOrersInProgress()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            return Ok(user.ConsumerOrders.Where(i => i.OrderState == OrderState.IN_PROGRESS.ToString()));
        }

        [HttpGet("GetOrderById/{id}")]
        [Authorize(Roles = "CONSUMER")]
        public IActionResult GetOrderById(string id)
        {                
            return Ok(_orderRepository.GetById(Int32.Parse(id)));
        }


    }
}
