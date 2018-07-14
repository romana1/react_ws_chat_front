import React from "react";

import PropTypes from "prop-types";
import ExampleItem from "./ExampleItem";

export default class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
   };

  state = {
    availableHeight: 0,
    scrollTop: 0
  };

  componentDidMount() {
    this.setState({
      availableHeight: this.node.clientHeight
    });
  }

  handleScroll = event => {
    this.setState({
      scrollTop: event.target.scrollTop
    });
  };

  render() {
    const { availableHeight, scrollTop } = this.state;
    const { numRows, rowHeight } = this.props;
    const totalHeight = rowHeight * numRows;

    let startIndex;

    if (scrollTop < (totalHeight - availableHeight) ) 
    startIndex = Math.floor(scrollTop / rowHeight);
    else startIndex = Math.floor((totalHeight - availableHeight) / rowHeight)

    const endIndex =
      startIndex + Math.ceil(availableHeight / rowHeight) + 1;

    const itemsE = [];
      
    for (let i = 0; i <= 10000; i++) {
    itemsE.push(<ExampleItem indexE={i} />);
    }

    const items = [];

    let index = startIndex;
    while (index < endIndex) {
      items.push(<div key={index}>{itemsE[index]}</div>);
      index++;
    }

    return (
      <div
        onScroll={this.handleScroll}
        style={{ height: "100vh", overflowY: "scroll" }}
        ref={node => (this.node = node)}
      >
        <div
          style={{
            // height: totalHeight,
            paddingTop: startIndex * rowHeight
          }}
        >
          {items}
        </div>
      </div>
    );
  }
}

