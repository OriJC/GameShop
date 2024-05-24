using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Gameshop.model
{
    public class GameCategory
    {
        [BsonId]
        public int Id { get; set; }
        [BsonElement("Name")]
        public string Name { get; set; }
        [BsonElement("CreatedDate")]
        public DateTime CreatedDate { get; set; }
    }
}
