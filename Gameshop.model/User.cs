using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Gameshop.model
{
    public class User
    {
        [BsonRequired]
        [BsonElement("Name")]
        public string UserName { get; set; }
        [BsonRequired]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        [BsonElement("Email")]
        public string Email { get; set; }
        [BsonRequired]
        [BsonElement("Password")]
        public string Password { get; set; }
    }
}
