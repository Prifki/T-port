import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import LoginMenu from '../landing/header/presentational/LoginMenu';
import FavoritesMenu from '../landing/header/presentational/FavoritesMenu';
import BurgerNavBar from '../landing/header/presentational/BurgerNavBar';
import MobileGlobalSearch from '../landing/header/presentational/MobileGlobalSearch';
import FindARouteMenu from '../landing/header/presentational/FindARouteMenu';

class Main extends Component {
  render() {
    return (
        <main>
            {/*<BurgerNavBar />
            <MobileGlobalSearch />
            <FindARouteMenu />*/}
            {this.state.loginMenuActive ? <LoginMenu /> : null}
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
