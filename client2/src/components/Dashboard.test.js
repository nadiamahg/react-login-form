import React from "react";
import { mount, configure, shallow } from "enzyme";
import {Dashboard} from "./Dashboard";
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

const mockLogoutfn = jest.fn();
const props = {
    auth : {
        user: {
            email: "test@gmail.com",
            age: "32",
            isAdmin: "false"
        }
    },
    logoutUser: mockLogoutfn
}

const mockHistory = { push: jest.fn() };

configure({ adapter: new Adapter() })

describe("Dashboard Component", () => {
    const wrapper = mount(<Dashboard {...props} history={mockHistory}/>)

    it('should render Dashboard correctly', () => {
        const component = renderer.create(<Dashboard {...props}/>,);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('should have a logout button', () => {
        expect(wrapper.find('button').text()).toEqual('Logout');
    });

    it('should display user information', () => {
        expect(wrapper.find('div#userEmail').text()).toEqual('Email: test@gmail.com');
        expect(wrapper.find('div#userAge').text()).toEqual('Age: 32');
        expect(wrapper.find('div#userIsAdmin').text()).toEqual('isAdmin: false');
    });

    it('should call logout function when logout button clicked', () => {
        wrapper.find('button').simulate('click');
        expect(mockLogoutfn.mock.calls.length).toEqual(1);
    });

    it('should navigate to login form page when logout button clicked', () => {
        wrapper.find('button').simulate('click');
        expect(mockHistory.push.mock.calls[0]).toEqual(['/']);
    });
});