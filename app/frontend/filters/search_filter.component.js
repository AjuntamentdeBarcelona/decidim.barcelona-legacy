import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { setFilterText }      from './filters.actions';

class SearchFilter extends Component {
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
            onChange={(event) => this.props.setFilterText(event.target.value)} 
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

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilterText }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchFilter);
