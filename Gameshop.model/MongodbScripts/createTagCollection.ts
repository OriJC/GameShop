db.createCollection("Tag",
    {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    'Name',
                    'CreatedDate'
                ],
                properties: {
                    name: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    createTime: {
                        bsonType: 'date',
                        description: 'must be a date and is required'
                    }
                }
            }
        }
    })