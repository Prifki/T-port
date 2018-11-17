import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LoginMenu from './../components/landing/header/presentational/LoginMenu';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('LoginMenu', () => {
    it('should render correctly', () => {
      const output = shallow(
        <LoginMenu isLoginMenuOpen={true} />
      );
      expect(shallowToJson(output)).toMatchSnapshot();
    });
});

