import React from 'react';

export class ChatBlock extends React.Component {  
    render() {
        const columnStyle = {
            display: 'flex',
            flexDirection: 'col'
        }
        const selfOuterStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '99%',
            marginBottom: '8px',
            //marginRight: '10px',
        }
        const othersOuterStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: '8px',
            marginLeft: '10px'
        }
        const chatboxStyle = {
            width: '300px',
            height: 'auto',
            boxSizing: 'border-box',
            backgroundColor: 'lightblue',
            padding: '10px',
            borderRadius: '10px',
            fontFamily: 'Arial',
            wordWrap: 'break-word'  
        }
        const senderStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '85%',
            width: '300px'
        }
        if (this.props.flag === 'self') {
            return <div style={columnStyle}>
                <div style={selfOuterStyle}>
                    <div>
                        <div style={chatboxStyle}>{this.props.userMessage}</div>
                        <div style={senderStyle}>
                            <div>{this.props.userName}</div>
                            <div>{this.props.timestamp}</div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (this.props.flag === 'others') {
            return <div style={columnStyle}>
                <div style={othersOuterStyle}>
                    <div>
                        <div style={chatboxStyle}>{this.props.userMessage}</div>
                        <div style={senderStyle}>
                            <div>{this.props.userName}</div>
                            <div>{this.props.timestamp}</div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}