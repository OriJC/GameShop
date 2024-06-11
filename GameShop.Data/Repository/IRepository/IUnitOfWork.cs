using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IGameCategoryRepository GameCategory { get; }
        ICompanyRepository Company { get; }

        Task<bool> Commit();
    }
}
