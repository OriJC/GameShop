using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class ShoppingCart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonRequired]
        [BsonElement("UserId")]
        public string UserId { get; set; }

        [BsonElement("CreatedDate")]
        public DateTime? CreatedDate { get; set; }

        [BsonElement("Items")]
        public ICollection<ShoppingCartItem> Items { get; set; }

        [BsonElement("ProductCount")]
        public int ProductCount { get; set; }

        [BsonElement("TotalPrice")]
        public int TotalPrice { get; set; }

        [BsonElement("IsActive")]
        public bool isActive { get; set; }
    }
}
