import { Component, PropTypes } from 'react';

export default class SubcategoryPicker extends Component {
  subcategories () {
    const { participatoryProcessId } = this.props;

    var categoryId = this.props.categoryId;
    var subcategories = this.props.subcategories.filter( (subcategory) =>
      subcategory.categoryId === categoryId
    );

    var selectedId = this.props.selectedId;
    var component = this;

    return subcategories.map( function(subcategory){
      var selected = subcategory.id === selectedId;

      var classNames = ['subcategory', 'subcategory-' + subcategory.id];

      return (
        <div className={classNames.join(' ')}
            key={subcategory.id}
            onClick={() => component.select(subcategory)}>
          <input type="checkbox" checked={selected} onChange={() => {}} />
          <label className="name">{subcategory.name} <a href={`/${participatoryProcessId}/categories#subcategory_${subcategory.id}`} target="_blank"> <i className="fa fa-info-circle"></i></a></label>
        </div>
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

SubcategoryPicker.propTypes = {
  categoryId: PropTypes.string.isRequired,
  subcategories: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  participatoryProcessId: PropTypes.string.isRequired
};
