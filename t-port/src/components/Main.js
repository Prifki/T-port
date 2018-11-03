import React, { Component } from 'react';
import FilterByType from './page_components/FilterByType';
import Table from './page_components/Table';
import Pagination from './page_components/Pagination';
import Card from './page_components/Card';
import LoginMenu from './menus_components/LoginMenu';
import FavoritesMenu from './menus_components/FavoritesMenu';
import BurgerNavBar from './menus_components/BurgerNavBar';
import MobileGlobalSearch from './menus_components/MobileGlobalSearch';
import FindARouteMenu from './menus_components/FindARouteMenu';

class Main extends Component {
  render() {
    return (
        <main>
            {/*<BurgerNavBar />
            <MobileGlobalSearch />
            <FindARouteMenu />*/}
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <Table />
                <Pagination />
                <Card />
            </div>
            {/*<LoginMenu />
            <FavoritesMenu />*/}
        </main>
    );
  }
}

export default Main;
