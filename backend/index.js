const addMessage = require("./ChatHistoryCreateItem");
const scanHistory = require("./ChatHistoryScanTable");

exports.storeScanMessage = async (event) => {
    if(event.httpMethod == "GET") {
        console.log(JSON.stringify(event, null, 2));
        const timeStamp = parseInt(event.queryStringParameters.time);
        const history = await scanHistory(timeStamp);
        console.log(history);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Access-Control-Allow-Headers":"*"
            },
            body: JSON.stringify(history)
        }
    } else if(event.httpMethod == "POST") {
        console.log(JSON.stringify(event, null, 2));
        const newChat = JSON.parse(event.body);
        await addMessage(newChat.name, newChat.time, newChat.message);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Access-Control-Allow-Headers":"*"
            },
            body: JSON.stringify({})
        }
    }
};