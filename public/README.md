# Online Group Chatroom
## Architecture
In this project, JavaScript frontend library React, HTTP Client library Axios and routing library React Router are applied on the frontend. Several AWS services are also used for both backend and frontend: DynamoDB, Lambda, API Gateway, S3, Cloudfront. Below is the dataflow diagram:
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/DataFlow.png)


## Results
Web link: http://d3mk3y4oeekz8k.cloudfront.net/<br />
New user needs to create a username:
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/Login.png)
Enter the chatroom and get chat history:
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/Chatroom.png)


## Backend
### Database with DynamoDB
A table contains all the messages is built with Amazon DynamoDB which is a NoSQL database. Each item in the table contains 3 elements: userName, timestamp and userMessage. UserName is used as the Partition key and timestamp is used as the Sort key. Therefore, it is easier to scan the table or make a query.
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/MessageTable.png)

### Backend logic with Serverless Computing Platform Lamda


### Create APIs with API Gateway


## Frontend

## Testing
I use AWS Cloudwatch to monitor...
Use try catch ...
Use console.log so I can see some important information if I inspect the web page ...

Set debugCount and set time interval ...


