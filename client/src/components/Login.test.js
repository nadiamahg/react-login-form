import React from "react";
import { mount, configure, shallow } from "enzyme";
import {Login} from "./Login";
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

const mockLoginfn = jest.fn();
const props = {
    auth : {
        isAuthenticated: false
    },
    errors: {},
    login: mockLoginfn
}

const mockHistory = { push: jest.fn() };

configure({ adapter: new Adapter() })

describe("Login Component", () => {
     const wrapper = mount(<Login {...props} history={mockHistory}/>)

     it('should render Login correctly', () => {
        const component = renderer.create(<Login {...props}/>,);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should render form without throwing an error', () => {
        expect(wrapper.find('form').exists()).toBe(true);
    })
    
    it('should have a login button', ()=> {
        expect(wrapper.find('button').text()).toEqual('Login');
        expect(wrapper.find('button').prop('type')).toEqual('submit');
    });

    it('should have input fields for email and password', ()=> {
        expect(wrapper.find('input#email')).toHaveLength(1);
        expect(wrapper.find('input#password')).toHaveLength(1);
    });

    it('should call the mock login function', () => {
       wrapper.find('form').simulate('submit', {preventDefault() {}});
       expect(mockLoginfn.mock.calls.length).toBe(1);
    })

    it('should have an empty email and password state var', ()=> {
        expect(wrapper.state('email')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
    });

    it('should navigate to dashboard page when user is authenticated', ()=> {
        const newProps = {
            auth : {
                isAuthenticated: true
            },
            errors: {},
            login: mockLoginfn
        }
        const wrapper = mount(<Login {...newProps} history={mockHistory} />);
        expect(mockHistory.push.mock.calls[0]).toEqual(['/dashboard']);
    });

    it('should have validation error messages when there are errors for email and password', ()=> {
        const errors = {
            email: "Email error",
            password: "Password error"
        }
        wrapper.setState({errors});
        expect(wrapper.find('div#emailError').text()).toEqual('Email error');
        expect(wrapper.find('div#passwordError').text()).toEqual('Password error');

    });

    it('should navigate to dashboard page when user is authenticated in nextProps', ()=> {
        wrapper.setProps({auth: {isAuthenticated: true}})
        expect(mockHistory.push.mock.calls[0]).toEqual(['/dashboard']);
    });
});