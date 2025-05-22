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
    public abstract class Repository<T> : IRepository<T> where T : class, new()
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

        public virtual async Task<T> GetOneByFilter(FilterDefinition<T> filter)
        {
            var bsonCollection = _collection.Database.GetCollection<BsonDocument>(_collection.CollectionNamespace.CollectionName);

            filter ??= Builders<T>.Filter.Empty;
            var cursor = await _collection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry));
            var result = await cursor.FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            else
            {
                return result;
            }
        }

        public virtual async Task<TProjection> GetOneByProjectionAndFilter<TProjection>(FilterDefinition<T> filter = null, ProjectionDefinition<T, TProjection> projection = null) where TProjection : class, new()
        {
            filter ??= Builders<T>.Filter.Empty;
            var findOptions = new FindOptions<T, TProjection> { Projection = projection };
            var cursor = await _collection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry), findOptions);
            var result = await cursor.FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            else
            {
                return result;
            }
        }

        public virtual async Task<IEnumerable<T>> GetAllByFilter(FilterDefinition<T> filter = null)
        {
            
            filter ??= Builders<T>.Filter.Empty;

            var cursor = await _collection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry));
            var results = await cursor.ToListAsync();
            
            if(results == null || results.Count == 0)
            {
                return Enumerable.Empty<T>();
            }
            return results;     
        }

        public virtual async Task<IEnumerable<TProjection>> GetAllByProjectionAndFilter<TProjection>(FilterDefinition<T> filter = null, ProjectionDefinition<T, TProjection> projection = null) where TProjection: class, new()
        {
            filter ??= Builders<T>.Filter.Empty;
            var findOptions = new FindOptions<T, TProjection> { Projection = projection };
            var cursor = await _collection.FindAsync(filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<T>(), BsonSerializer.SerializerRegistry), findOptions);
            var results = await cursor.ToListAsync();
            if(results == null || results.Count == 0)
            {
                return Enumerable.Empty<TProjection>();
            }
            else
            {
                return results;
            }               
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
