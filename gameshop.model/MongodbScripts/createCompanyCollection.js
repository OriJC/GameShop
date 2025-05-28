db.createCollection("Company",
{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["Name"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "Name must be string and required"
                },
                createDate: {
                    bsonType: "date",
                    description: "Date must be date"
                },
                phoneNumber: {
                    bsonType: "string",
                    description: "PhoneNumber must be string"
                },
                address: {
                    bsonType: "object",
                    properties: {
                        state: {
                            bsonType: "string",
                            description: "State must be a string"
                        },
                        city: {
                            bsonType: "string",
                            description: "City must be a string"
                        },
                        street: {
                            bsonType: "string",
                            description: "Street Street must be a string"
                        },
                        zipCode: {
                            bsonType: "string",
                            description: "ZipCode must be a string"
                        }
                    }
                }
            }
        }
    }
})