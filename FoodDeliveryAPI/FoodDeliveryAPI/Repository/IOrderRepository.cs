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

		List<Order> GetFinishedAndInProgress();

		void ChangeOrderState(string state, int id);

		void UpdateOrder(Order order);

		Order GetById(int id);

		
	}
}

