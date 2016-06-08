import { Component }          from 'react';
import { connect }            from 'react-redux';

import { setFilterText }      from './filters.actions';

class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: this.props.searchText
    };
  }

  render() {
    return (
      <div className="row collapse prefix-radius">
        <div className="small-2 large-1 columns">
          <span className="prefix"><i className="icon-search"></i></span>
        </div>
        <div className="small-10 large-11 columns">
          <input 
            className="search-filter"
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

export default connect(
  null,
  { setFilterText }
)(SearchFilter);
