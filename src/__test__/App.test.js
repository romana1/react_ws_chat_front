import 'jsdom-global/register'; 

import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../App';
import ListView from '../Components/ListView.js'
import ExampleItem from '../Components/ExampleItem.js'

describe('<App>', () => {

    it('renders without crashing', () => {
        shallow(<App />);
       });
    
    it('renders 121 of 1000 exampleItem on 1200 height screen', () => {

        const wrapper = mount(<ListView numRows={1000} rowHeight={10} />);
        wrapper.setState({availableHeight : 1200})

        expect(wrapper.find(ExampleItem).length).toBe(121);
  
    });

    it('renders at first, 121, then 161 of 1000 exampleItem on 1200 height screen', () => {

        const wrapper = mount(<ListView numRows={1000} rowHeight={10} />);
        wrapper.setState({availableHeight : 1200});
        wrapper.setState({availableHeight : 1600});

        expect(wrapper.find(ExampleItem).length).toBe(161);
      
    });

})


