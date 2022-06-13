using System;
using System.Linq;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public class CartRepository : ICartRepository
	{
        private readonly DeliveryContext _context;

        public CartRepository(DeliveryContext context)
        {
            _context = context;
        }

        public void Add(Cart cart)
        {
             _context.Add(cart);
            _context.SaveChanges();
        }

        public void AddCartItem(CartItem cartItem, int cartId)
        {
            Cart cartTemp = _context.Cart.Where(i => i.Id == cartId).FirstOrDefault();
            cartTemp.CartItems.Add(cartItem);
            _context.SaveChanges();
        }

        public void UpdateCart(Cart cart, User user)
        {
            
        }
    }
}

