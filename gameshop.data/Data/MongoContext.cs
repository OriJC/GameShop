using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace GameShop.Data.Data
{
    public class MongoContext : IMongoContext
    {
        public MongoClient _client { get; set; }
        public IClientSessionHandle Session { get; set; }
        public IMongoDatabase _database { get; set; }
        private readonly IConfiguration _configuration;
        private readonly List<Func<Task>> _commands;
        public IGridFSBucket _gridFS { get; private set; }


        public MongoContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _commands = new List<Func<Task>>();
        }

        private void ConfigureMongo()
        {
            if(_client != null)
            {
                return;
            }
            _client = new MongoClient(_configuration["MongoDb:ConnectionString"]);
            _database = _client.GetDatabase(_configuration["MongoDb:DatabaseName"]);
            _gridFS = new GridFSBucket(_database);
        }

        public async Task<int> SaveChanges()
        {
            ConfigureMongo();

            using (Session = await _client.StartSessionAsync())
            {
                try 
                {
                    Session.StartTransaction();

                    var commandTasks = _commands.Select(c => c()); ;
                    await Task.WhenAll(commandTasks);
                    await Session.CommitTransactionAsync();
                }
                catch(Exception ex)
                {
                    Session.AbortTransaction();
                    Console.WriteLine(ex);
                }
            }
            return _commands.Count;
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            ConfigureMongo();
            return _database.GetCollection<T>(name);
        }

        public void Dispose()
        {
            Session?.Dispose();
            GC.SuppressFinalize(this);
        }

        public void AddCommand(Func<Task> command)
        {
            _commands.Add(command);
        }   
        
    }
}
