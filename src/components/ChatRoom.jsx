import React from 'react';
import { Login } from './Login';
import { ChatBlock } from './ChatBlock';
import { ChatroomUserInput } from './ChatroomUserInput';
import { AxiosRequests } from '../axios_requests';

export class ChatRoom extends React.Component {
    constructor(input) {
        super(input)
        //this.debugCount = 0;
        this.myrender = null;
        this.client = new AxiosRequests();
        this.messagesDiv = React.createRef();
        this.webOpenTime = Date.now() - 3000000000;
        this.state= {
            userName: localStorage.getItem('USERNAME'),
            userMessage: "",
            timestamp: "",
            history: []
        }
    }

    componentDidMount() {
        this.getHistory()       
        // setTimeout(()=>{
        //     this.getHistory()
        // }, 1000);
        this.myrender = setInterval(()=>{
            this.getHistory()
        }, 1000)      
    }

    scrollToMyRef() {
        console.log("testing scroll");
        console.log(this.messagesDiv.current);
        if(this.messagesDiv.current !== null){
            const scroll = this.messagesDiv.current.scrollHeight - window.innerHeight; 
            console.log(scroll)
            //this.messagesDiv.current.scrollTo(0, 400);
            window.scrollTo(0, scroll+45)
        }
    }

    render() {    
        if (this.state.userName === null) {
            return <Login onSetUsername={(newName)=>{
                this.setState({userName: newName})
                localStorage.setItem('USERNAME', newName)
            }}/>
        } else {
            return <div style={{marginBottom: '45px', overflowY: 'scroll'}} ref={this.messagesDiv}>
                {//get chat history       
                    this.renderChatHisotry()
                }     
                {//User enter new chat input, update chat history
                    this.renderUserInput()
                }
            </div> 
        }   
    }

    renderChatHisotry() {
        return this.state.history.map((item, index) => {
            const date = new Date(item[1])
            const timestamp = (date.getMonth()+1)+"/"+
                            date.getDate()+"/"+
                            date.getFullYear()+" "+
                            date.getHours()+":"+
                            date.getMinutes()+":"+
                            date.getSeconds()
            
            if(item[0] === this.state.userName){
                return <ChatBlock key={index} userName={item[0]} timestamp={timestamp} userMessage={item[2]} flag={'self'}/>         
            }else {
                return <ChatBlock key={index} userName={item[0]} timestamp={timestamp} userMessage={item[2]} flag={'others'}/>   
            }
        })       
    }

    renderUserInput() {
        return <ChatroomUserInput goToChatbot={() => {
            this.props.goToChatbot()
        }} onSendMessage={async (newTimestamp, newMessage) => {
            await this.client.postMessage(this.state.userName, newTimestamp, newMessage)
            await this.getHistory()
        }} />
    }

    async getHistory() {
        const messages = await this.client.scanHistory(this.webOpenTime);
        //const chatHistory = []
        // for(let i = 0; i < messages.length; i++){
        //     let message = [messages[i].userName, messages[i].timestamp, messages[i].userMessage]  
        //     chatHistory.push(message)
        // }
        //Use flag to scroll the window only when new message is post
        var flag = 0;
        //Create a new reference to update the history array
        const chatHistory = Array.from(this.state.history)
        const json_chatHistory = JSON.stringify(chatHistory)
        console.log(chatHistory)

        //Below is the bad example of checking an array in an array of array
        //Remember array is an object, can not compare object with object
        // messages.map((item) => {
        //     let message = [item.userName, item.timestamp, item.userMessage]
        //     if(!(chatHistory.includes(message))) {
        //         console.log("New Chat")
        //         flag = 1;
        //         chatHistory.push(message)
        //     }
        // })
        for(let i = 0; i < messages.length; i++){
            let message = [messages[i].userName, messages[i].timestamp, messages[i].userMessage]
            //change message to json, then use indexOf to check if it's a new message or not
            let json_message = JSON.stringify(message)
            let checkIndex = json_chatHistory.indexOf(json_message)
            if(checkIndex === -1){
                flag = 1
                chatHistory.push(message)
            }
        }

        this.setState({ history: chatHistory })
        if(flag === 1){
            this.scrollToMyRef()
            flag = 0
        }
        //this.debugCount += 1
        // if(this.debugCount === 3){
        //     clearInterval(this.myrender)
        // }
    }
}