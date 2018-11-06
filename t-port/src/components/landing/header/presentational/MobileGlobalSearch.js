import React, { Component } from 'react';
import MobileGlobalSearchClosingButton from './MobileGlobalSearchClosingButton';
import MobileGlobalSearchResults from './MobileGlobalSearchResults';

class MobileGlobalSearch extends Component {
  render() {
    const className = this.props.isMobileGlobalSearchOpen ? 'mobile-global-search mobile-global-search--active' : 'mobile-global-search';
    return (
		<div className = {className} >
			<div className="mobile-global-search__field-wrapper">
				<input type="text" placeholder="Search…" list="mobile-search-items" id="mobile-find-input" />
			</div>
            <MobileGlobalSearchClosingButton onClick={this.props.toggleMobileGlobalSearch} />
            <MobileGlobalSearchResults />
		</div>
    );
  }
}

export default MobileGlobalSearch;
