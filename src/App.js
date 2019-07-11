import React from 'react';
import MessagesList from "./Components/MessagesList";
import UsersList from "./Components/UsersList";
import MessageInput from "./Components/MessageInput";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080',
//  {autoConnect: false }
 );

class App extends React.Component {

  constructor() {
    super();
    this.connectionError = this.connectionError.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.state = { 
      messages: [],
      users: [],
      loginInput: '',
      login: null,
      error: null };
  }

  componentDidMount() {
      socket.on('connect',  () => {
        socket.on('users', this.usersList.bind(this));
        socket.on('messages', this.messagesReceive.bind(this));
        socket.on('disconnect', () => {
          this.connectionError({msg: "socket disconnected, try reconnect"});
          
          // this could solve bug with socket.io-client
          // https://github.com/socketio/socket.io-client/issues/1175

          // socket.emit('message', JSON.stringify([]));
        });
      });
  }

  connectionError(err) {
    this.setState({ 
      error: err.msg,
      login: null,
      users: []
    });
    console.log( err.msg ? err.msg : "connectionError" )
  }
  
  usersList(users) {
    if (users.length === 0) this.setState({ login: null });
    this.setState({ users: users });
  }
  
  messagesReceive(msg) {
    this.setState({ messages: [...this.state.messages, ...msg] });
  }
  
  handleChangeLogin(e) {
    this.setState({loginInput: e.target.value});
  }

  handleSubmitLogin(e) {
    e.preventDefault();
    this.setState({ login: this.state.loginInput });
    socket.emit('user', { login: this.state.loginInput });
    return fetch(`http://localhost:8080/messages`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.length > 0)
          this.setState({ messages: data })
        else 
          this.setState({messages: []})
      })
      .catch((err) => {
        this.connectionError({msg: "Fetch msgs error"});
      });
  }

  render() {
    let login = this.state.login;
    const autoFocus = login ? false : true;
    return (
      <div className="chat-box">
        <div className="chat-header ui-widget-header">React Chat</div>
        <div className="chat-content-wrapper row">
          <MessagesList messages={this.state.messages} login={login}></MessagesList>
          {!login ? (
            <div className="users-list col-3">
              <form onSubmit={this.handleSubmitLogin}>
                <p> Please, name yourself</p>
                <input type="text" value={this.state.loginInput} onChange={this.handleChangeLogin}  autoFocus={autoFocus} />
                <input type="submit" value="Submit" />
              </form>
            </div>) :
            (<UsersList users={this.state.users} ></UsersList>)}
        </div>
        <MessageInput
          socket={socket} login={login}>
        </MessageInput>
      </div>
    );
  }
}

export default App;
