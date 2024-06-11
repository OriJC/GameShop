using GameShop.Data.Data;
using GameShop.Data.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMongoContext _mongoContext;
        public UnitOfWork(IMongoContext mongoContext)
        {
            _mongoContext = mongoContext;
            GameCategory = new GameCategoryRepository(_mongoContext);
            Company = new CompanyRepository(_mongoContext);
        }

        public IGameCategoryRepository GameCategory { get; private set; }
        public ICompanyRepository Company { get; private set; }

        public async Task<bool> Commit()
        {
            var changeAmout = await _mongoContext.SaveChanges();
            return changeAmout > 0;
        }

        public void Dispose()
        {
            _mongoContext.Dispose();
        }
    }
}
