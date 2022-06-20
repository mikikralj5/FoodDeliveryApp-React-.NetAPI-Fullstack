using System;
using System.Collections.Generic;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public interface IOrderRepository
	{


		void MakeOrder(Order order);

		List<Order> GetPendingOrders();

		List<Order> GetCompletedOrdersByUser(string username);

		void ChangeOrderState(string state, int id);
	}
}

