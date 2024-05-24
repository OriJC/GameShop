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
    public class GameCategoryRepository : Repository<GameCategory> , IGameCategoryRepository
    {
        public GameCategoryRepository(IMongoContext context) : base(context) { }
    }
}
