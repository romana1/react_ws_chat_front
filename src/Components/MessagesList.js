import React from 'react';
import ChatMessage from "./ChatMessage";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.messageContainer = React.createRef()
    }
  
    componentDidUpdate() {
        let container = this.messageContainer.current;
        const shouldScrollBottom = Math.ceil(container.scrollTop)  + container.offsetHeight >= container.scrollHeight;
        if (shouldScrollBottom) {
            container.scrollTop = container.scrollHeight
          }
    }
  
    render() {
      let messages;
      messages = this.props.messages.map(function (m, i) {
        return (
          <ChatMessage key={'messageKey' + i} message={m}></ChatMessage>
        );
      });
      if (!this.props.login) {
        messages = <div className="chat-no-messages">No messages</div>;
      }
      return (
        <div ref={this.messageContainer} className="chat-messages col-9">
          {messages}
        </div>
      );
    }
  };