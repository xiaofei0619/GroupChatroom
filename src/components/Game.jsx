import React from 'react';
import Button from 'react-bootstrap/Button';
// class Cell extends React.Component {
//     constructor(input) {
//         super(input) // {this.props = input; this.state = undefined}
//         this.id = input.id;
//         this.state = {
//             id: input.id
//         }
//     }
//     render() {
//         console.log('rendering', this.props.name)
//         return <Button variant='outline-secondary' onClick={() => {
//             this.setState({
//                 id: this.state.id + 1
//             })
//         }}>{this.state.id}</Button>
//     }
// }

// export class Game extends React.Component {
//     render() {
//         return <div>
//                 <Cell id={1} name={'btn1'}/>
//                 <Cell id={1} name={'btn2'}/>
//             </div>
//     }
// }

class Cell extends React.Component {
    constructor(input) {
        super(input) // {this.props = input; this.state = undefined}
        this.id = input.id;
    }
    render() {
        console.log('rendering', this.props.name)
        return <Button variant='outline-dark' onClick={this.props.increment}>{this.props.id}</Button>
    }
}

export class Game extends React.Component {
    constructor(input) {
        super(input)
        this.state = {
            btn1: 1,
            btn2: 1
        }
    }
    render() {
        return <div>
                <Cell id={this.state.btn1} name={'btn1'} 
                    increment={() => {
                        this.setState({
                            btn1: this.state.btn1 + 1
                        })
                    }}/>
                <Cell id={this.state.btn2} name={'btn2'}
                    increment={() => {
                        this.setState({
                            btn2: this.state.btn2 + 1
                        })
                    }}/>
                <div>{this.state.btn1 + this.state.btn2}</div>
            </div>
    }
}