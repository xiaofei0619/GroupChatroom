async function addMessage(name, time, message){
    const AWS = require("aws-sdk");
    const docClient = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});
    console.log("Adding a new item...");
    try {
        await docClient.put({
            TableName: "ChatHistory",
            Item: {
                "userName": name,
                "timestamp": time,
                "userMessage": message
            }
        }).promise();
        console.log("Item Added Successfully.");
    } catch (err) {
        console.error("Unable to add item. Error JSON: ", JSON.stringify(err, null, 2));
    }
}
module.exports = addMessage;