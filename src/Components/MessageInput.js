import React from 'react';

export default class MessageInput extends React.Component {

    constructor(props) {
       
        super(props);       
        this.keyHandler = this.keyHandler.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.state = { message: '' };
    }

    keyHandler(e) {
        const socket = this.props.socket;
        if (e.keyCode === 13) {
            e.preventDefault();
            let msg = this.state.message.trim();
            if (msg.length > 0) {
               socket.emit('message', JSON.stringify(
                   {created_at: new Date().toISOString(), 
                    author: this.props.login, 
                    content: msg}));
            }
            this.setState({ message: '' });
        }
    }

    inputChange(e) {
        this.setState({ message: e.target.value });    
    }

    render() {
        const autoFocus = this.props.login ? true : false;
        return (
            <input type="text" 
            autoFocus={autoFocus}
                className='form-control'
                placeholder={this.props.login}
                value={this.state.message}
                onKeyUp={this.keyHandler}
                onChange={this.inputChange} />
        );
    }
};