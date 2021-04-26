# Online Group Chatroom
## Architecture
In this project, I use AWS services for both backend and frontend: DynamoDB, Lambda, API Gateway, S3, Cloudfront.
Below is the dataflow diagram. 
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/DataFlow.png)

## Backend
### Database with DynamoDB
A table contains all the messages is built with Amazon DynamoDB which is a NoSQL database. Each item in the table contains 3 things: userName, timestamp and userMessage. UserName is used as the Partition key and timestamp is used as the Sort key. 


### Backend logics with Serverless Computing Platform AWS Lamda

### Create APIs with 
## Frontend

## Testing
I use AWS Cloudwatch to monitor...
Use try catch ...
Use console.log so I can see some important information if I inspect the web page ...

Set debugCount and set time interval ...


