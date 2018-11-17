import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BookmarkButton from './../components/pages/presentational/BookmarkButton';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('BookmarkButton', () => {
    it('should render correctly', () => {
      const output = shallow(
        <BookmarkButton type="star_border" />
      );
      expect(shallowToJson(output)).toMatchSnapshot();
    });
});

