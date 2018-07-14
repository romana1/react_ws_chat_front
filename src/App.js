import React from 'react';
import ListView from "./Components/ListView";

import './App.css';

class App extends React.Component {

  render() {
    return (
      <div>
       <ListView
          numRows={1000}
          rowHeight={10}
        />
      </div> 
    );
  }
}

export default App;
