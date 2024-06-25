using GameShop.Data.Data;
using GameShop.Data.Repository.IRepository;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameShop.Data.Repository
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        protected readonly IMongoContext _mongoContext;
        protected IMongoCollection<T> _collection;

        protected Repository(IMongoContext context)
        {
            _mongoContext = context;
            _collection = _mongoContext.GetCollection<T>(typeof(T).Name);
        }

        public virtual void Add(T obj)
        {
            _mongoContext.AddCommand(() => _collection.InsertOneAsync(obj));
        }

        public virtual async Task<T> GetById(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return null;
            }
            var data = await _collection.FindAsync(Builders<T>.Filter.Eq("_id", objectId));
            return data.SingleOrDefault();
        }

        public virtual async Task<IEnumerable<T>> GetAll()
        {
            var data = await _collection.FindAsync(Builders<T>.Filter.Empty);
            return data.ToList();
        }

        public virtual async Task<object> GetOneByProjectAndFilter(FilterDefinition<T> filter, ProjectionDefinition<BsonDocument> projection)
        {
            var bsonCollection = _collection.Database.GetCollection<BsonDocument>(_collection.CollectionNamespace.CollectionName);

            var findOptions = new FindOptions<BsonDocument> { Projection = projection };
            var cursor = await bsonCollection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry), findOptions);
            var result = await cursor.FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            else
            {
                var dict = result.ToDictionary();
                if (dict.ContainsKey("_id") && dict["_id"] is ObjectId objectId)
                {
                    dict["_id"] = objectId.ToString();
                }
                return dict;
            }
        }

        public virtual async Task<IEnumerable<object>> GetAllByProjectAndFilter(FilterDefinition<T> filter, ProjectionDefinition<BsonDocument> projection)
        {
            var bsonCollection = _collection.Database.GetCollection<BsonDocument>(_collection.CollectionNamespace.CollectionName);

            var findOptions = new FindOptions<BsonDocument, BsonDocument> { Projection = projection };
            var cursor = await bsonCollection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry), findOptions);
            var results = await cursor.ToListAsync();
            var jsonResults = new List<object>();
            foreach (var document in results)
            {
                var dict = document.ToDictionary();
                if (dict.ContainsKey("_id") && dict["_id"] is ObjectId objectId)
                {
                    dict["_id"] = objectId.ToString();
                }
                jsonResults.Add(dict);
            }
            return jsonResults;
        }

        public virtual void Update(T obj)
        {
            var idProperty = typeof(T).GetProperty("Id");
            if (idProperty == null)
            {
                throw new InvalidOperationException($"The type {typeof(T).Name} does not contain an 'Id' property.");

            }
            var id = idProperty.GetValue(obj).ToString();
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new InvalidOperationException($"Cannot convert input Id to Object id");
            }
            _mongoContext.AddCommand(() => _collection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", objectId), obj));
        }

        public virtual void Remove(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new InvalidOperationException($"Cannot convert input Id to Object id");
            }
            _mongoContext.AddCommand(() => _collection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", objectId)));
        }

        public void Dispose()
        {
            _mongoContext?.Dispose();
        }
    }
}
