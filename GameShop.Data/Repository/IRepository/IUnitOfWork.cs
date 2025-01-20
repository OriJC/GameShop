using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoryRepository Category { get; }
        ICompanyRepository Company { get; }
        IProductTagRepository ProductTag { get; }
        IProductRepository Product { get; }
        IApplicationUserRepository User { get; }
        IShoppingCartRepository ShoppingCart { get; }
        IShoppingCartItemRepository ShoppingCartItem { get; }

        Task<bool> Commit();
    }
}
