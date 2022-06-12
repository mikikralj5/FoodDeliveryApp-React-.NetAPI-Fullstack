using System;
using System.Linq;
using System.Threading.Tasks;
using FoodDeliveryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodDeliveryAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DeliveryContext _context;

        public UserRepository(DeliveryContext context)
        {
            _context = context;
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public User GetByUsername(string username)
        {
            return _context.Users.Where(i => i.Username == username).FirstOrDefault();
        }

        public bool UserExists(string username)
        {
            return _context.Users.Any(e => e.Username == username);
        }
    }
}
