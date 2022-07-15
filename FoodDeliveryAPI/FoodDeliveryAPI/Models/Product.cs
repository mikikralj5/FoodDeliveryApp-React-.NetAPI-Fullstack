using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDeliveryAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        public double Price { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Ingredients { get; set; }
        
        public Product()
        {
        }
    }
}
