using GameShop.Data.Data;
using GameShop.Data.Repository.IRepository;
using Gameshop.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Repository
{
    public class ShoppingCartItemRepository : Repository<ShoppingCartItem>, IShoppingCartItemRepository
    {
        public ShoppingCartItemRepository(IMongoContext context) : base(context) { }
    }
}
