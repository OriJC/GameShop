using GameShop.Data.Data;
using GameShop.Data.Repository.IRepository;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            try
            {
                _mongoContext.AddCommand(() => _collection.InsertOneAsync(obj));
            }
            catch(Exception ex)
            {
               
            }
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

        public virtual void Update(T obj, string id)
        {
            var idProperty = typeof(T).GetProperty("Id");
            if (idProperty != null)
            {
                throw new InvalidOperationException($"The type {typeof(T).Name} does not contain an 'Id' property.");

            }
            //var id = idProperty.GetValue(obj);
            _mongoContext.AddCommand(() => _collection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", id), obj));
        }

        public virtual void Remove(Guid id)
        {
            _mongoContext.AddCommand(() => _collection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", id)));
        }

        public void Dispose()
        {
            _mongoContext?.Dispose();
        }
    }
}
