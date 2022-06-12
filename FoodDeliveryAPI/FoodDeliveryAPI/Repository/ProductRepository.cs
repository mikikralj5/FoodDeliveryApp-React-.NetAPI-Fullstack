using System;
using System.Collections.Generic;
using System.Linq;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public class ProductRepository : IProductRepository
	{


        private readonly DeliveryContext _context;

        public ProductRepository(DeliveryContext context)
        {
            _context = context;
        }

        public void AddProduct(Product product)
        {
            _context.Add(product);
            _context.SaveChanges();
        }

        
    }
}

