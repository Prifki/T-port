import React from 'react';
import { render } from 'react-dom';
import { configure } from 'enzyme';
import App from './../components/landing/App';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock('react-dom');
describe('App', () => {
    it('should render correctly', () => {
      expect(render).toHaveBeenCalledWith(
        <App  />, 'element-node'
      );
      expect(render).toHaveBeenCalledTimes(1);
    });
  });