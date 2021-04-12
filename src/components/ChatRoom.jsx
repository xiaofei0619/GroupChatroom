import React from 'react';
import { Login } from './Login';
import { ChatBlock } from './ChatBlock';
import { UserInput } from './UserInput';
import { AxiosRequests } from '../axios_requests';

export class ChatRoom extends React.Component {
    constructor(input) {
        super(input)
        this.debugCount = 0;
        this.client = new AxiosRequests();
        this.messagesDiv = React.createRef();
        this.webOpenTime = Date.now() - 2592000000;
        this.state= {
            userName: localStorage.getItem('USERNAME'),
            userMessage: "",
            timestamp: "",
            history: []
        }
    }

    componentDidMount() {
        //Work on the backend stuff after render()
        // setTimeout(()=>{
        //     console.log('scrolling')
        //     this.scrollToMyRef()
        // }, 5000)

        this.getHistory()
        
        // setTimeout(()=>{
        //     this.getHistory()
        // }, 1000);

        var myrender = setInterval(()=>{
            this.getHistory()
        }, 10000)

        if(this.debugCount === 10){
            clearInterval(myrender)
        }
    }

    scrollToMyRef() {
        const scroll =
            this.messagesDiv.current.scrollHeight - window.innerHeight;
          //this.messagesDiv.current.scrollHeight -
          //this.messagesDiv.current.clientHeight;
        //console.log(window.innerHeight)
        //console.log(this.messagesDiv.current.clientHeight)
        console.log(scroll)
        //this.messagesDiv.current.scrollTo(0, 400);
        window.scrollTo(0, scroll+45)
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
            return <ChatBlock key={index} userName={item[0]} timestamp={timestamp} userMessage={item[2]}/>
        })       
    }

    renderUserInput() {
        return <UserInput onSendMessage={async (newTimestamp, newMessage)=>{
            await this.client.postMessage(this.state.userName, newTimestamp, newMessage)
            await this.getHistory()
        }}/>
    }

    async getHistory() {
        //Create a new reference to update the history array
        const chatHistory = []
        const messages = await this.client.scanHistory(this.webOpenTime);
        for(let i = 0; i < messages.length; i++){
            let message = [messages[i].userName, messages[i].timestamp, messages[i].userMessage]  
            chatHistory.push(message)
        }
        //const chatHistory = Array.from(this.state.history)
        // messages.map((item) => {
        //     let message = [item.userName, item.timestamp, item.userMessage]
        //     if(!(chatHistory.includes(message))) {
        //         console.log("New Chat")
        //         chatHistory.push(message)
        //     }
        // })
        this.setState({history: chatHistory})
        console.log(this.state.history)
        this.debugCount += 1
    }
}