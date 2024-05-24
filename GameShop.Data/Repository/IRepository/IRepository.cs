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
        Task<T> GetById(Guid id);
        Task<IEnumerable<T>> GetAll();
        void Update(T obj);
        void Remove(Guid id);
    }
}
