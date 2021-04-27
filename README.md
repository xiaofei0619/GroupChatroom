# Online Group Chatroom
## Architecture
In this project, JavaScript frontend library React, HTTP Client library Axios and routing library React Router are applied on the frontend. Several AWS services are also used for both backend and frontend: DynamoDB, Lambda, API Gateway, S3, CloudFront. Below is the dataflow diagram:\
<br/>
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/DataFlow.png)
<br/>

## Results
Web link: http://d3mk3y4oeekz8k.cloudfront.net/<br/>
New user needs to create a username:
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/Login.png)
Enter the chatroom and get chat history:
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/Chatroom.png)
Enter new message at the end of the webpage, and click **Send** button:
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/Input.png)
Render another web page by clicking **ChatBot** button:
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/Chatbot.png)
Go back to chatroom by clicking **Back To ChatRoom** button.
<br/>
## Backend
### Database with DynamoDB
A table contains all the messages is built with Amazon DynamoDB which is a NoSQL database. Each item in the table contains 3 elements: userName, timestamp and userMessage. UserName is used as the Partition key and timestamp is used as the Sort key. Therefore, it is easier to scan the table or make a query.
![Dataflow](https://raw.githubusercontent.com/xiaofei0619/ReactExercise/master/documentation/MessageTable.png)
<br/>
### Backend logic with Serverless Computing Platform Lambda
Write Lambda Function with DynamoDB Node.js SDK. There are only 2 methods.<br/>
1. When httpMethod is "GET"<br/>
Scan all the messages after the given time in queryStringParameters from the DynamoDB table by calling function scanHistory(timeStamp).</br>
<br/>In scanHistory(timeStamp) function, we use method scan() and Filter Expression to get all the messages we require. Since elements in DynamoDB table is randomly stored, we need to sort the messages based on the timestamp. Then return the data in JSON format.

2. When httpMethod is "POST"<br/>
First parse the event body to get the three elements of this new message: username, timestamp and usermessage. Then, call function addMessage(name, time, message).<br/>
<br/>In addMessage(name, time, message) function, we combine the three inputs into an object for key "Item". Then, call use method put() to put this new "Item" into the table.

After "GET"/"POST", return the object containing the status code, CORS setting and required data.
<br/>
### Create APIs with API Gateway
Lambda function is linked to APIs in API Gateway. There are 2 methods of type LAMBDA_PROXY: GET and POST.
<br/>
## Frontend
### Design Idea
All components are written as classes: Login, ChatBlock, ChatroomUserInput, ChatRoom and ChatBot. Function render() is in the base component ChatRoom.\
<br/>
If the user is new, render Login Component for the user to create username. Once the user click "Join", store the username in localStorage, update the username state, and record the web-open time simultaneously. Then, scan the recent 1-month history based on that time because we don't want show all the history in case it is too long. \
<br/>
We modify the history into an array of array and store it as a state called history. Now, we render each message in history with ChatBot class. At the same time, we render the ChatroomUserInput which allows users to enter new messages.\
<br/>
Everytime there is a user sends new message, call postMessage() function to store the new message to backend table, and then call scanHistory() function to update the state and render webpage. Besides of that, we call scanHistory() function every second to make the live chat **realtime**.
<br/>
### Send HTTP Request
To scan the chat history or post new chat message, we send HTTP requests with HTTP client library called Axios. First create the http client with the URL provided by API Gateway. Then, use the methods get() and post() provided by Axios.
<br/>
### Navigation between Components
Initially, the plan was to create a Chatbot with GCP Dialogflow service for the user to communicate with. Due to the dependency problem, I put it as future work. However, I still use React Router to reserve the second page for that feature. There are two *routes*, one is going to ChatRoom component, the other is going to ChatBot component. In *Router* and *Switch*, combine the hook *useHistory()* with the buttons to achieve the navigation between the *Routes*.
<br/>
## Deployment
To deploy this React web project, first build the project and store the files in an AWS S3 bucket. Now, create a CloudFront distribution linked to the S3 bucket. Note: for the entire project, use AWS IAM to manage the role and permissions for accessing different services.
<br/>
## Testing
Although I have not learned how to write unittests on web applications, I did a lot of manual testing during the development. When I worked on the frontend components, it's quite useful to show and adjust the component layers with background color. However, it took much more time testing the backend logic. Here are several methods I use:\
<br/>
1. Use console.log() to print out any information or data and see if that's what I expected
2. Use AWS CloudWatch to monitor the HTTP requests
3. Use try... catch... to catch any possible failures
4. Setup debug counter in frontend render function which prevents a huge amount of unnecessary HTTP requests\
<br/>
During the testing, I found a bug about CORS(Cross-Origin Resource Sharing) which is an HTTP protocal. It checks the permissions in various browsers to see whether the API can be used or should be blocked. I got the errors because I did not do any CORS setting. Later I found there is a HTTP method called OPTIONS on API Gateway, it is used to check permissions. Based on its returning event object, I setup my Access Control variables which solved the problem.
<br/>

## Future Work

1. Implement Chatbot with Google Cloud Service - Dialogflow, Express.js, MongoDB, etc.
2. Login authentication, send requests with token.



