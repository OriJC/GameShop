using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Gameshop.model
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        [BsonRequired]
        [BsonElement("Name")]
        public string Name { get; set; }
        [BsonElement("Description")]
        public string Description { get; set; }
        [BsonElement("CreatedDate")]
        public DateTime? CreatedDate { get; set; }

        //Price List
        [BsonRequired]
        [BsonElement("ListPrice")]
        [Range(1, 100000)]
        public double ListPrice { get; set; }
        [BsonElement("Price")]
        [Range(1, 100000)]
        public double Price { get; set; }
        [BsonElement("Price50")]
        [Range(1, 100000)]
        public double Price50 { get; set; }
        [BsonElement("Price100")]
        [Range(1, 100000)]
        public double Price100 { get; set; }

        // Company
        [BsonElement("CompanyId")]
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }

        [BsonIgnore]
        public Company Company { get; set; }

        
    }
}

