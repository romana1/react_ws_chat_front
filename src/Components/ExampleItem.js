import React from 'react';

export default class ExampleItem extends React.Component {

//   static get propTypes() {
//     return {
//       index: React.PropTypes.number
//     };
//   }

  render() {
    return(
      <div className='example'>
        This is {this.props.indexE}
      </div>
    );
  }

}