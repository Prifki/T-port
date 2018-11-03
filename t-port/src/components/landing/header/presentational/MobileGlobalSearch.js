import React, { Component } from 'react';
import MobileGlobalSearchClosingButton from './MobileGlobalSearchClosingButton';
import MobileGlobalSearchResults from './MobileGlobalSearchResults';

class MobileGlobalSearch extends Component {
  render() {
    return (
		<div className="mobile-global-search">
			<div className="mobile-global-search__field-wrapper">
				<input type="text" placeholder="Search…" list="mobile-search-items" id="mobile-find-input" />
			</div>
            <MobileGlobalSearchClosingButton />
            <MobileGlobalSearchResults />
		</div>
    );
  }
}

export default MobileGlobalSearch;
