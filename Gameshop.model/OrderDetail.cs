using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class OrderDetail
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonRequired]
        [BsonElement("OrderId")]
        public string OrderId { get; set; }

        [BsonRequired]
        [BsonElement("OrderHeader")]
        public OrderHeader OrderHeader { get; set; }

        [BsonRequired]
        [BsonElement("Product")]
        public List<Product> Product { get; set; }

        [BsonRequired]
        [BsonElement("ProductCount")]
        public int ProductCount { get; set; }

        [BsonRequired]
        [BsonElement("Price")]
        public double Price { get; set; }
    }
}
