using System;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public interface IOrderRepository
	{


		void MakeOrder(Order order);
	}
}

