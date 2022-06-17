using System;
namespace FoodDeliveryAPI.DTOs.Order
{
	public class OrderItemDto
	{
		public FoodDeliveryAPI.Models.Product Product { get; set; }
		public int Amount { get; set; }
		

		public OrderItemDto()
		{
		}
	}
}

