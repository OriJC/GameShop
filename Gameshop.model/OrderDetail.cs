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
    public class Orderetail
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonRequired]
        [BsonElement("OrderId")]
        public int OrderId { get; set; }

        [ValidateNever]

        [BsonElement("OrderHeader")]
        public OrderHeader OrderHeader { get; set; }

        [BsonElement("Product")]
        public List<Product> Product { get; set; }

        [BsonElement("ProductCount")]
        public int ProrductCount { get; set; }

        [BsonElement("Price")]
        public double Price { get; set; }
    }
}
