using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Gameshop.model
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        [BsonElement("Name")]
        public string Name { get; set; }
        [BsonElement("CreatedDate")]
        public DateTime CreatedDate { get; set; }
    }
}
