import { Component }          from 'react';
import { connect }            from 'react-redux';

export default class SubcategoryPicker extends Component {
  subcategories () {
    const { subcategories, subcategory } = this.props;

    return subcategories.map(sc => {
      var selected = subcategory && sc.id === subcategory.id;

      var classNames = ['subcategory-' + sc.id];
      if(selected){ classNames.push('selected'); }

      return (
        <li className={classNames.join(' ')}
            key={sc.id}
            onClick={() => this.select(sc)}>
          <span className="name">{sc.name} <a href={`/categories#subcategory_${sc.id}`} target="_blank"> <i className="fa fa-info-circle"></i></a></span>
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
