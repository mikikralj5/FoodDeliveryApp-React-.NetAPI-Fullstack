using System;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public interface ICartRepository
	{
		void Add(Cart cart);

		void AddCartItem(CartItem cartItem, int cartId);

		void UpdateCart(Cart cart, User user);

		
	}
}

