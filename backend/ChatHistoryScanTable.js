async function scanHistory(time){
    const AWS = require("aws-sdk");
    const docClient = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});
    console.log("Scanning Chat History...");
    try {
        var data = await docClient.scan({
            TableName: "ChatHistory",
            ProjectionExpression: "userName, #t, userMessage",
            FilterExpression: "#t >= :time1",
            ExpressionAttributeNames: {
                "#t": "timestamp"
            },
            ExpressionAttributeValues: {
                ":time1": time,
            }
        }).promise();
        console.log("Scan Succeeded.");
        data.Items.sort((i1, i2) => i1.timestamp - i2.timestamp);
        // data.Items.forEach(function(item){
        //     console.log(item.timestamp+" "+item.userName+": "+item.userMessage);
        // })
        return data.Items
    } catch (err) {
        console.error("Unable to scan table. Error JSON: ", JSON.stringify(err, null, 2));
    }
}
module.exports = scanHistory;