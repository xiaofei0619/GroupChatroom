import React from 'react';
import { Login } from './Login';
import { ChatBlock } from './ChatBlock';
import { UserInput } from './UserInput';

export class ChatRoom extends React.Component {
    constructor(input) {
        super(input)
        this.state= {
            userName: localStorage.getItem('USERNAME'),
            userMessage: "",
            timestamp: "",
            history: [["Xiaofei", "02/05/2021 01:10:10", "Hello"],["Nan", "02/06/2021 09:00:05", "How're you?"]]
        }
    }

    render() {
        if (this.state.userName === null) {
            //Callback function
            return <Login onSetUsername={(newName)=>{
                this.setState({userName: newName})
                localStorage.setItem('USERNAME', newName)
            }}/>
        } else {
            //get chat history
            return <div>
                {//print out the history: for each item in history array, call function
                this.state.history.map((item, index) => {
                    return <ChatBlock key={index} userName={item[0]} timestamp={item[1]} userMessage={item[2]}/>
                })}
                
                {//User enter new chat input and update chat history
                    this.renderUserInput()
                }
            </div>
        }   
    }

    renderUserInput() {
        return <UserInput onSendMessage={(newTimestamp, newMessage)=>{
            //console.log({newMessage, newTimestamp})
            const updatedHistory = Array.from(this.state.history)
            updatedHistory.push([this.state.userName, newTimestamp, newMessage])
            this.setState({history: updatedHistory})
        }}/>
    }

}