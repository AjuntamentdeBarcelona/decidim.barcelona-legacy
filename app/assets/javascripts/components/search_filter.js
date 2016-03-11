import { Component } from 'react';

export default class SearchFilter extends Component {
  render() {
    return (
      <div className="row collapse prefix-radius">
        <div className="small-2 large-1 columns">
          <span className="prefix"><i className="icon-search"></i></span>
        </div>
        <div className="small-10 large-11 columns">
          <input 
            className="search-filter"
            value={this.props.searchText}
            placeholder={I18n.t("components.search_filter.search_input_placeholder")}
            onChange={(event) => this.filterByText(event.target.value)} 
            onKeyDown={(event) => this.onKeyDown(event)} />
        </div>
      </div>
    );
  }

  filterByText(searchText) {
    this.props.onSetFilterText(searchText);
  }

  onKeyDown(event) {
    let key = event.keyCode;

    if (key === 13) { // Prevent form submission
      event.preventDefault();
    }
  }

}
