using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FoodDeliveryAPI.DTOs.Order;
using FoodDeliveryAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/Deliverer")]
    [ApiController]
    public class DelivererController : ControllerBase
    {
        
        private readonly IOrderRepository _orderRepository;

        public DelivererController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet("GetPendingOrders")]
        public IActionResult GetPendingOrders()
        {
            return Ok(_orderRepository.GetPendingOrders());
        }

        [HttpPost("ChangeOrderState")]
        public IActionResult ChangeOrderState([FromBody] OrderStateDto orderStateDto)
        {
            _orderRepository.ChangeOrderState(orderStateDto.State, orderStateDto.Id);
            return Ok();
        }

       


    }
}
