import React, { Component } from 'react';
import FilterByType from './page_components/FilterByType';
import Table from './page_components/Table';
import Pagination from './page_components/Pagination';
import Card from './page_components/Card';
import LoginMenu from './menus/LoginMenu';
import FavoritesMenu from './menus/FavoritesMenu';
import BurgerNavBar from './menus/BurgerNavBar';

class Main extends Component {
  render() {
    return (
        <main>
            <BurgerNavBar />
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
