import React from 'react';

export default  class UsersList extends React.Component {
  
    render() {
      var users = this.props.users.map( (user, i) => {
        return <div key={'userKey' + i} className="chat-user">{user}</div>;
      });
      return (
        <div className="users-list col-3">
        <p>List of Chat users</p>                
          {users}
        </div>
      );
    }
  };