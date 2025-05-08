using GameShop.Data.Data;
using GameShop.Data.Repository.IRepository;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
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

        public virtual async Task<object> GetOneByFilter(FilterDefinition<T> filter)
        {
            var bsonCollection = _collection.Database.GetCollection<BsonDocument>(_collection.CollectionNamespace.CollectionName);

            filter ??= Builders<T>.Filter.Empty;
            var cursor = await bsonCollection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry));
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

        public virtual async Task<object> GetOneByProjectionAndFilter(FilterDefinition<T> filter = null, ProjectionDefinition<BsonDocument> projection = null)
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

        public virtual async Task<IEnumerable<object>> GetAllByFilter(FilterDefinition<T> filter = null)
        {
            var bsonCollection = _collection.Database.GetCollection<BsonDocument>(_collection.CollectionNamespace.CollectionName);
            filter ??= Builders<T>.Filter.Empty;

            var cursor = await bsonCollection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry));
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

        public virtual async Task<IEnumerable<object>> GetAllByProjectionAndFilter(FilterDefinition<T> filter = null, ProjectionDefinition<BsonDocument> projection = null)
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

        public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType)
        {
            var options = new GridFSUploadOptions
            {
                Metadata = new BsonDocument
                {
                    { "contentType", contentType }
                }
            };
            var objectId = await _mongoContext._gridFS.UploadFromStreamAsync(fileName, imageStream, options);
            return objectId.ToString();
        }

        public async Task<(byte[] Content, string ContentType)> GetImageAsync(string imageId)
        {
            if(!ObjectId.TryParse(imageId, out var objectId))
            {
                return (null, null);
            }

            var fileInfo = await _mongoContext._gridFS.Find(Builders<GridFSFileInfo>.Filter.Eq("_id", objectId)).FirstOrDefaultAsync();
            if(fileInfo == null)
            {
                return (null, null);
            }
            using(var stream = new MemoryStream())
            {
                await _mongoContext._gridFS.DownloadToStreamAsync(objectId, stream);
                return (stream.ToArray(), fileInfo.Metadata["contentType"].AsString);
            }
        }
    }
}
