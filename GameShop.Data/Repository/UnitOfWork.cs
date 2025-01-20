using Amazon.SecurityToken.Model;
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
            Category = new CategoryRepository(_mongoContext);
            Company = new CompanyRepository(_mongoContext);
            ProductTag = new ProductTagRepository(_mongoContext);
            Product = new ProductRepository(_mongoContext);
            User = new ApplicationUserRepository(_mongoContext);
            ShoppingCart = new ShoppingCartRepository(_mongoContext);
            ShoppingCartItem = new ShoppingCartItemRepository(_mongoContext);
        }

        public ICategoryRepository Category { get; private set; }
        public ICompanyRepository Company { get; private set; }
        public IProductTagRepository ProductTag { get; private set; }
        public IProductRepository Product {  get; private set; }
        public IApplicationUserRepository User { get; private set; }
        public IShoppingCartRepository ShoppingCart { get; private set; }
        public IShoppingCartItemRepository ShoppingCartItem { get; private set; }

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
