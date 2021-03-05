import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class Login extends React.Component {
    constructor(input) {
        super(input)
        this.state = {
            userName: ""
        }
    }
    render() {
        const outerStyle = {
            width: '580px',
            height: '200px',
            margin: 'auto',
            backgroundColor: 'lightblue'
        }
        const loginFormStyle = {
            width: '80%',
            padding: '30px',
            fontFamily: 'Arial'
        }
        return <div style={outerStyle}>
            <Form style={loginFormStyle}>
                <Form.Group controlId="formUserName">
                    <Form.Label>Welcome to Xiaofei's Online ChatRoom!</Form.Label>
                    <Form.Control 
                        value={this.state.userName}
                        onChange={evt => {
                            console.log(evt.target.value)
                            this.setState({userName: evt.target.value})
                        }}
                        placeholder="Enter username..."/>
                    <Form.Text className="text-muted">
                        We will create an account for you
                    </Form.Text>
                </Form.Group>
                <Button variant="info" size="sm" onClick={()=>{
                    this.props.onSetUsername(this.state.userName)
                }}>Join</Button>
            </Form>
        </div>
    }
}
