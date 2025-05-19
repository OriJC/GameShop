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
        public string name { get; set; }

        [BsonRequired]
        [BsonElement("PhoneNumber")]
        public string phoneNumber { get; set; }

        [BsonRequired]
        [BsonElement("State")]
        public string state { get; set; }

        [BsonRequired]
        [BsonElement("City")]
        public string city { get; set; }

        [BsonElement("StreetAddress")]
        public string streetAddress { get; set; }

        [BsonRequired]
        [BsonElement("PostalCode")]
        public string postalCode { get; set; }


    }
}
