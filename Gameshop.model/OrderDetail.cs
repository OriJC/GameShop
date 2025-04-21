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

        [BsonElement("State")]
        public string? State { get; set; }

        [BsonElement("City")]
        public string? City { get; set; }

        [BsonElement("Street")]
        public string? Street { get; set; }

        [BsonElement("ZipCode")]
        public string? ZipCode { get; set; }
    }
}
