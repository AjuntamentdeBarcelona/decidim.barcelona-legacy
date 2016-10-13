import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from '../application/icon.component';

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
          <div className="input-group">
            <input
              className="input-group-field"
              type="search"
              value={this.state.searchText}
              placeholder={I18n.t("components.search_filter.search_input_placeholder")}
              onChange={(event) => this.onChange(event.target.value)} 
              onKeyDown={(event) => this.onKeyDown(event)} />
            <div className="input-group-button">
              <button onClick={(event) => this.search(event)} className="button button--muted">
                <Icon name="magnifying-glass" ariaLabel="Buscar" role="img" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onKeyDown(event) {
    let key = event.keyCode;

    if (key === 13) {
      this.search(event);
    }
  }

  onChange(searchText) {
    this.setState({ searchText });
  }

  search(event) {
    const { searchText } = this.state;

    this.props.setFilterText(searchText)
    event.preventDefault();
  }

}

export default connect(null, actions)(SearchFilter);

SearchFilter.propTypes = {
  searchText: PropTypes.string,
  setFilterText: PropTypes.func.isRequired
};
