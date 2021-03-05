import React from 'react';

export class ChatBlock extends React.Component {  
    render() {
        const outerStyle = {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            margin: 'auto',
            marginBottom: '8px'
        }
        const chatboxStyle = {
            width: '100%',
            height: 'auto',
            boxSizing: 'border-box',
            backgroundColor: 'lightblue',
            padding: '10px',
            borderRadius: '10px',
            fontFamily: 'Arial'    
        }
        const senderStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '85%'
        }
        return <div style={outerStyle}>
            <div style={chatboxStyle}>{this.props.userMessage}</div>
            <div style={senderStyle}>
                <div>{this.props.userName}</div>
                <div>{this.props.timestamp}</div>
            </div>
        </div>
    }
}