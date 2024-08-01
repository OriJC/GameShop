using GameShop.Data.Repository.IRepository;
using Gameshop.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GameShop.Data.Data;

namespace GameShop.Data.Repository
{
    public class ApplicationUserRepository: Repository<ApplicationUser>, IApplicationUserRepository
    {
        public ApplicationUserRepository(IMongoContext context) : base(context) { }
    }
}
