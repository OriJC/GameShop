using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Data
{
    public interface IMongoContext : IDisposable
    {
        void AddCommand(Func<Task> command);
        Task<int> SaveChanges();
        IMongoCollection<T> GetCollection<T>(string name);
        IGridFSBucket _gridFS { get; }
    }
}
