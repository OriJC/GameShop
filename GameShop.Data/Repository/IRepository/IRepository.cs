using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Repository.IRepository
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void Add(T obj);
        Task<T> GetById(string id);
        Task<IEnumerable<T>> GetAll();
        Task<T> GetOneByFilter(FilterDefinition<T> filter);
        Task<TProjection> GetOneByProjectionAndFilter<TProjection>(FilterDefinition<T> filter = null, ProjectionDefinition<T, TProjection> projection = null) where TProjection: class, new(); 
        Task<IEnumerable<T>> GetAllByFilter(FilterDefinition<T> filter = null);
        Task<IEnumerable<TProjection>> GetAllByProjectionAndFilter<TProjection>(FilterDefinition<T> filter = null, ProjectionDefinition<T, TProjection> projection = null) where TProjection: class, new();
        void Update(T obj);
        void Remove(string id);
        Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType);
        Task<(byte[] Content, string ContentType)> GetImageAsync(string imageId);
    }
}
