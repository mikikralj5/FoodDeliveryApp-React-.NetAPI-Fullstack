using System;
using System.Threading.Tasks;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
    public interface IUserRepository
    {
        //Task<User> GetByUsername(string username);

        User GetByUsername(string username);

        void AddUser(User user);

        bool UserExists(string username);
    }
}
