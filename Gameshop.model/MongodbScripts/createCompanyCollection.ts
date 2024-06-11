db.createCollection("Company",
{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "Name must be string and required"
                },
                CreateDate: {
                    bsonType: "date",
                    description: "Date must be date"
                },
                PhoneNumber: {
                    bsonType: "string",
                    description: "PhoneNumber must be string"
                },
                Address: {
                    bsonType: "object",
                    properties: {
                        State: {
                            bsonType: "string",
                            description: "State must be a string"
                        },
                        City: {
                            bsonType: "string",
                            description: "City must be a string"
                        },
                        Street: {
                            bsonType: "string",
                            description: "Street Street must be a string"
                        },
                        ZipCode: {
                            bsonType: "string",
                            description: "ZipCode must be a string"
                        }
                    }
                }
            }
        }
    }
})