import React from 'react';
import Button from 'react-bootstrap/Button';

class Cell extends React.Component {
    constructor(input) {
        super(input) // {this.props = input; this.state = undefined}
        this.id = input.id;
        this.state = {
            id: input.id
        }
    }
    render() {
        console.log('rendering', this.props.name)
        return <Button variant='outline-secondary' onClick={() => {
            this.setState({
                id: this.state.id + 1
            })
        }}>{this.state.id}</Button>
    }
}

export class Game extends React.Component {
    render() {
        return <div>
                <Cell id={1} name={'btn1'}/>
                <Cell id={1} name={'btn2'}/>
            </div>
    }
}