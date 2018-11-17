import React from 'react';
import { shallow, configure } from 'enzyme';
import FavoritesMenu from './../components/landing/header/presentational/FavoritesMenu';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('should handle state changes', () => {
    const output = shallow(
      <FavoritesMenu isFavoritesMenuOpen={true} favorites={[{title: "Route TL13", type: "departure_board"}]} />
    );
    
    expect(output.state().favoritesEditingMode).toEqual(false);
    output.find('FavoritesEditButton').simulate('click');
    expect(output.state().favoritesEditingMode).toEqual(true);
});

