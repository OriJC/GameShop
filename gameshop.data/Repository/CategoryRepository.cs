using Gameshop.model;
using GameShop.Data.Data;
using GameShop.Data.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameShop.Data.Repository
{
    public class CategoryRepository : Repository<Category> , ICategoryRepository
    {
        public CategoryRepository(IMongoContext context) : base(context) { }
    }
}
