import React from 'react';
import Button from 'react-bootstrap/Button';

export class ChatBot extends React.Component {
    render() {
        return <div>
            <h4>Implementing the ChatBot...</h4>
            <img src={require('./robot1.gif').default} height={'500px'} width={'500px'}></img>

            
            <Button variant = "outline-info" onClick={()=>{
                this.props.backToHome()
            }}>Back To ChatRoom</Button>
        </div>
    }
}