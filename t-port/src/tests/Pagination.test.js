import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Pagination from './../components/pages/presentational/Pagination';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Pagination', () => {
    it('should render correctly', () => {
      const output = shallow(
        <Pagination />
      );
      expect(shallowToJson(output)).toMatchSnapshot();
    });
});

