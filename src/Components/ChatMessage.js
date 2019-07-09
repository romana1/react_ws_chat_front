import React from 'react';
import moment from 'moment';

export default class ChatMessage extends React.Component {

    render() {
      const msg = this.props.message;

      return (
        <div className="chat-message">
          <div className="message-time">[{moment(msg.created_at).format("YYYY-MM-DD HH:mm:ss")}]</div>
          <div className="message-author">&lt;{msg.author}&gt;</div>
          <div className="message-content">{msg.content}</div>
        </div>
      );
    }
  };