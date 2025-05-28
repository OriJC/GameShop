using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model
{
    public class OrderHeader
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonElement("ApplicationUserName")]
        public string ApplicationUserName { get; set; }

        [BsonRequired]
        [BsonElement("OrderDate")]
        public DateTime OrderDate { get; set; }

        [BsonElement("ShippingDate")]
        public DateTime ShippingDate { get; set; }

        [BsonElement("OrderTotal")]
        public double OrderTotal { get; set; }

        [BsonRequired]
        [BsonRepresentation(BsonType.String)]
        [BsonElement("OrderStatus")]
        public OrderStatus OrderStatus { get; set; }

        [BsonRequired]
        [BsonRepresentation(BsonType.String)]
        [BsonElement("PaymentStatus")]
        public PaymentStatus PaymentStatus { get; set; }

        [BsonElement("TrackingNumber")]
        public string? TrackingNumber { get; set; }

        [BsonRequired]
        [BsonElement("PaymentDate")]
        public DateTime PaymentDate { get; set; }

        [BsonRequired]
        [BsonElement("PaymentDueDate")]
        public DateTime PaymemntDueDate { get; set; }

        [BsonElement("SessionId")]
        public string? SessionId { get; set; }

        [BsonRequired]
        [BsonElement("PhoneNumber")]
        public string PhoneNumber { get; set; }

        [BsonRequired]
        [BsonElement("State")]
        public string State { get; set; }

        [BsonRequired]
        [BsonElement("City")]
        public string City { get; set; }

        [BsonRequired]
        [BsonElement("StreetAddress")]
        public string StreetAddress { get; set; }

        [BsonRequired]
        [BsonElement("PostalCode")]
        public string PostalCode { get; set; }

        [BsonRequired]
        [BsonElement("Name")]
        public string Name { get; set; }
    }


    public enum OrderStatus
    {
        PENDING,
        PROCESSING,
        SHIPPED,
        COMPLETED,
        CANCELLED
    }

    public enum PaymentStatus
    {
        PENDING_PAYMENT,
        PAID,
        REFUNDED,
        FAILED
    }
}
