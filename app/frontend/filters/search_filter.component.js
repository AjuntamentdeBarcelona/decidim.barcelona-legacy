import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './filters.actions';

class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: this.props.searchText
    };
  }

  render() {
    return (
      <div className="filters__section">
        <div className="filters__search">
          <input
            className="input-group-field search-filter"
            type="search"
            value={this.state.searchText}
            placeholder={I18n.t("components.search_filter.search_input_placeholder")}
            onChange={(event) => this.onChange(event.target.value)} 
            onKeyDown={(event) => this.onKeyDown(event)} />
        </div>
      </div>
    );
  }

  onKeyDown(event) {
    let key = event.keyCode;

    if (key === 13) { // Prevent form submission
      event.preventDefault();
    }
  }

  onChange(searchText) {
    this.setState({ searchText });

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.props.setFilterText(searchText)
    }, 300);
  }

}

export default connect(null, actions)(SearchFilter);

SearchFilter.propTypes = {
  searchText: PropTypes.string,
  setFilterText: PropTypes.func.isRequired
};
