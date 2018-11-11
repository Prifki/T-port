import React from 'react';

function Pagination(props) {
    return (
        <div className="pagination-wrapper">
            <div className="pagination">
                {props.pagination}
            </div>
        </div>
    );
}

export default Pagination;
