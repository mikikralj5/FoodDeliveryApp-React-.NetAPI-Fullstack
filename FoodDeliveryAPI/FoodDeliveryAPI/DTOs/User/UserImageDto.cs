using System;
using Microsoft.AspNetCore.Http;

namespace FoodDeliveryAPI.DTOs.User
{
	public class UserImageDto
	{
		IFormFile UserImage { get; set; }

		public UserImageDto()
		{
		}
	}
}

