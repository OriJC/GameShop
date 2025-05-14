db.createCollection("Product",
    {
        validator: {
            "$jsonSchema": {
                "bsonType": "object",
                "required": ["Name", "ListPrice", "CategoryId"],
                "properties": {
                    "Id": {
                        "bsonType": "objectId"
                    },
                    "Name": {
                        "bsonType": "string",
                        "description": "must be a string and is required"
                    },
                    "Description": {
                        "bsonType": "string",
                        "description": "must be a string"
                    },
                    "CreatedDate": {
                        "bsonType": "date",
                        "description": "must be a date"
                    },
                    "ListPrice": {
                        "bsonType": "double",
                        "minimum": 1,
                        "maximum": 100000,
                        "description": "must be a double and is required"
                    },
                    "Price": {
                        "bsonType": "double",
                        "minimum": 1,
                        "maximum": 100000,
                        "description": "must be a double"
                    },
                    "Price50": {
                        "bsonType": "double",
                        "minimum": 1,
                        "maximum": 100000,
                        "description": "must be a double"
                    },
                    "Price100": {
                        "bsonType": "double",
                        "minimum": 1,
                        "maximum": 100000,
                        "description": "must be a double"
                    },
                    "CompanyId": {
                        "bsonType": "objectId",
                        "description": "must be an ObjectId and is required"
                    },
                    "CategoryId": {
                        "bsonType": "objectId",
                        "description": "must be an ObjectId and is required"
                    },
                    "ProductTagsIds": {
                        "bsonType": "array",
                        "items": {
                            "bsonType": "objectId"
                        },
                        "description": "must be an array of ObjectIds and is required"
                    }
                }
            }
        }
    })
