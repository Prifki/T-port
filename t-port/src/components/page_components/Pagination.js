import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    return (
        <div className="pagination-wrapper">
            <div className="pagination">
                <a href="#" className="pagination--active">1</a>
                <a href="#">2</a>
            </div>
        </div>
    );
  }
}

export default Pagination;
