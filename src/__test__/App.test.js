import 'jsdom-global/register'; 

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../App';
import ChatMessage from '../Components/ChatMessage'
import MessageInput from '../Components/MessageInput'

describe('<App>', () => {

    it('renders without crashing', () => {
        shallow(<App />);
       });
    
    it('renders ChatMessage with message', () => {

        const wrapper = shallow(<ChatMessage message={{
            author: "Iam",
            content: "my",
            created_at: "1980-01-01 22:01:14"
        }} />);
       
        expect(wrapper.find('.message-time').text()).toBe('[1980-01-01 22:01:14]');
        expect(wrapper.find('.message-author').text()).toBe('<Iam>');
        expect(wrapper.find('.message-content').text()).toBe('my');
  
    });

    it('simulates keyUp events into MessageInput', () => {
        const keyHandler = sinon.spy(MessageInput.prototype, 'keyHandler');
        const socket = sinon.spy();
        const login = "123";
        const wrapper = mount(
          <MessageInput socket={socket} login={login} />
        );
        wrapper.setState({ message: 'Iam' })
        wrapper.find('input').simulate('keyUp');
        expect(keyHandler.calledOnce).toBe(true);
      });

})


