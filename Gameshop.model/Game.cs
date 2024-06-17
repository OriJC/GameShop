using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class Game : Product
    {
        // GameCategory
        [BsonElement("GameCategoryId")]
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string GameCategoryId { get; set; }
        [BsonIgnore]
        public GameCategory GameCategory { get; set; }
    }
    
}
