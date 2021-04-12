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
        // const date = new Date(this.props.timestamp)
        // const timestamp = (date.getMonth()+1)+"/"+
        //                     date.getDate()+"/"+
        //                     date.getFullYear()+" "+
        //                     date.getHours()+":"+
        //                     date.getMinutes()+":"+
        //                     date.getSeconds()
        return <div style={outerStyle}>    
            <div style={chatboxStyle}>{this.props.userMessage}</div>
            <div style={senderStyle}>
                <div>{this.props.userName}</div>
                <div>{this.props.timestamp}</div>
            </div>
        </div>
    }
}