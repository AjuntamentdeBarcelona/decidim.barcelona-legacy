import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

class SubcategoryPicker extends Component {
  subcategories () {
    const { subcategories, proposal } = this.props;

    return subcategories.map(subcategory => {
      var selected = proposal.subcategory && subcategory.id === proposal.subcategory.id;

      var classNames = ['subcategory-' + subcategory.id];
      if(selected){ classNames.push('selected'); }

      return (
        <li className={classNames.join(' ')}
            key={subcategory.id}
            onClick={() => this.select(subcategory)}>
          <span className="name">{subcategory.name} <a href={`/categories#subcategory_${subcategory.id}`} target="_blank"> <i className="fa fa-info-circle"></i></a></span>
        </li>
      );
    });
  }

  render () {
    return (
      <div className="subcategory-picker">
        <label>{I18n.t("components.category_picker.subcategory.label")}</label>
        <ul>
          {this.subcategories()}
        </ul>
      </div>
    );
  }

  select (subcategory) {
    if (this.props.onSelect) {
      this.props.onSelect(subcategory)
    }
  }
}

function mapStateToProps({ proposal }) {
  return { proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryPicker);
