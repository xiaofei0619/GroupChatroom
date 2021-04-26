const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({region: "us-west-2"});

dynamodb.createTable({
    TableName: "ChatHistory",
    KeySchema: [
        {AttributeName: "userName", KeyType: "HASH"},
        {AttributeName: "timestamp", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        {AttributeName: "userName", AttributeType: "S"},
        {AttributeName: "timestamp", AttributeType: "N"}
    ],
    BillingMode: "PAY_PER_REQUEST"
}, function(err, data){
    if(err) {
        console.error("Unable to create table. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
        console.log("Created Table. Table JSON: ", JSON.stringify(data, null, 2));
    }
});