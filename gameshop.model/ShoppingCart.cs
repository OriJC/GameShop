using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class ShoppingCart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonRequired]
        [BsonElement("UserName")]
        public string UserName { get; set; }

        [BsonElement("CreatedDate")]
        public DateTime CreatedDate { get; set; }

        private ICollection<ShoppingCartItem>? _items;


        [BsonElement("Items")]
        public ICollection<ShoppingCartItem>? Items 
        {   get => _items; 
            set
            {
                _items = value;
                UpdateCartSummary();
            } 
        }

        [BsonElement("ProductCount")]
        public int ProductCount { get; set; }

        [BsonElement("TotalPrice")]
        public double TotalPrice { get; private set; }

        [BsonElement("IsActive")]
        public bool IsActive { get; set; }

        public void AddItem(ShoppingCartItem item)
        {
            if (_items == null)
            {
                _items = new List<ShoppingCartItem>();
            }

            _items.Add(item);
            UpdateCartSummary();
        }

        public void RemoveItem(string itemId)
        {
            if (_items != null && _items.Any(i => i.Id == itemId))
            {
                var item = _items.First(i => i.Id == itemId);
                _items.Remove(item);
                UpdateCartSummary();
            }
        }

        public void ClearCart()
        {
            if (_items != null)
            {
                _items.Clear();
                UpdateCartSummary();
            }
        }
        
        public void UpdateItemQuantity(string itemId, int quantity)
        {
            if (_items == null || !_items.Any())
                return;
            
            var item = _items.FirstOrDefault(i => i.Id == itemId);
            if(item != null) 
            {
                item.Quantity = quantity;
                UpdateCartSummary();
            }       
        }
        private void UpdateCartSummary()
        {
            if(_items == null || !_items.Any())
            {
                ProductCount = 0;
                TotalPrice = 0;
            }
            else
            {
                ProductCount = _items.Sum(i => i.Quantity);
                TotalPrice = (int)_items.Sum(item => item.TotalPrice);
            }
        }
    }
}
