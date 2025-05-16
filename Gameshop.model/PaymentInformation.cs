using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class PaymentInformation
    {
        [BsonRequired]
        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonRequired]
        [BsonElement("PhoneNumber")]
        public string PhoneNumber { get; set; }

        [BsonRequired]
        [BsonElement("State")]
        public string State { get; set; }

        [BsonRequired]
        [BsonElement("City")]
        public string City { get; set; }

        [BsonElement("StreetAddress")]
        public string StreetAddress { get; set; }

        [BsonRequired]
        [BsonElement("PostalCode")]
        public string PostalCode { get; set; }


    }
}
