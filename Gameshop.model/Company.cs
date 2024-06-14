using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class Company
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        [BsonRequired]
        [BsonElement("Name")]
        public string Name { get; set; }
        [BsonElement("CreatedDate")]
        public DateTime? CreatedDate { get; set; }
        [BsonElement("Address")]
        public Address? Address { get; set; }
        [BsonElement("PhoneNumber")]
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
    }
}

public class Address
{
    [BsonElement("State")]
    public string? State { get; set; }
    [BsonElement("City")]
    public string? City { get; set; }
    [BsonElement("Street")]
    public string? Street { get; set; }
    [BsonElement("ZipCode")]
    public string? ZipCode { get; set; }

}
