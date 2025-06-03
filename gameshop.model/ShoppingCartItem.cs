using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class ShoppingCartItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonRequired]
        [BsonElement("ShoppingCartId")]
        public string ShoppingCartId { get; set; }

        [BsonRequired]
        [BsonElement("CreatedDate")]
        public DateTime CreatedDate { get; set; }

        [BsonRequired]
        [BsonElement("Product")]
        public Product Product { get; set; }

        private int _quantity;

        [BsonElement("Quantity")]
        public int Quantity 
        { 
            get => _quantity; 
            set 
            {
                _quantity = value;
                UpdatePricing();
            } 
        }

        [BsonElement("UnitPrice")]
        public double UnitPrice { get; private set; }

        [BsonElement("TotalPrice")]
        public double TotalPrice { get; private set; }

        private void UpdatePricing()
        {
            if (Product == null) return;
            if (Quantity >= 0 && Quantity < 50)
            {
                UnitPrice = Product.Price;
            }
            else if (Quantity >= 50 && Quantity < 100)
            {
                UnitPrice = Product.Price50;
            }
            else if (Quantity >= 100)
            {
                UnitPrice = Product.Price100;
            }
            TotalPrice = UnitPrice * Quantity;
        }
    }
}
