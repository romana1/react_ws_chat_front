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

    it('renders at first, 121 on 1200 height screen, then 161 of 1000 exampleItem on 1600 height screen', () => {

        const wrapper = mount(<ListView numRows={1000} rowHeight={10} />);
        wrapper.setState({availableHeight : 1200});
        wrapper.setState({availableHeight : 1600});

        expect(wrapper.find(ExampleItem).length).toBe(161);
      
    });

    it('renders following elements on scroll ', () => {

        const wrapper = mount(<ListView numRows={1000} rowHeight={10} />);
        wrapper.setState({availableHeight : 1200});

        const rootDomNode = wrapper.getDOMNode();
        rootDomNode.scrollTop = 1300;
        wrapper.simulate('scroll', {target : rootDomNode});
        wrapper.update();

        expect(wrapper.find(ExampleItem).at(0).contains(<div className="example">
        This is
        130
      </div>)).toBe(true);

      
    });

})


