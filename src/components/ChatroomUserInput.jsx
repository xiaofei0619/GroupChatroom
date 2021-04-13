import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


export class ChatroomUserInput extends React.Component {
    constructor(input) {
        super(input)
        this.state = {
            //Initial State
            userInput:""
        }
    }
    render() {
        //console.log(this.props.value)
        const stylex = {
            right: "0px",
            bottom: '0px',
            position: 'fixed',
        }
        return <InputGroup style={stylex}>
            <FormControl
                value={this.state.userInput}
                onChange={evt => {
                    console.log(evt.target.value)
                    this.setState({
                        userInput: evt.target.value})
                }}
                placeholder="Start Chatting..."
            />
            <InputGroup.Append>
                <Button variant="outline-info" onClick={() => {
                    const date = Date.now()
                    console.log(date)
                    this.props.onSendMessage(date, this.state.userInput)
                    this.setState({ userInput: "" })
                }}>Send</Button>
                <Button variant="outline-info" onClick={() => {
                    this.props.goToChatbot()
                }}>ChatBot 🤖</Button>
            </InputGroup.Append>

        </InputGroup>
    }
}

