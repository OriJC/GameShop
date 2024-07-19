using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Repository.IRepository
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void Add(T obj);
        Task<T> GetById(string id);
        Task<IEnumerable<T>> GetAll();
        Task<object> GetOneByProjectAndFilter(FilterDefinition<T> filter, ProjectionDefinition<BsonDocument> projection);
        Task<IEnumerable<object>> GetAllByProjectAndFilter(FilterDefinition<T> filter, ProjectionDefinition<BsonDocument> projection);
        void Update(T obj);
        void Remove(string id);
        Task<ObjectId> UploadImageAsync(Stream imageStream, string fileName, string contentType);
        Task<byte[]> GetImageAsync(ObjectId imageId);
    }
}
