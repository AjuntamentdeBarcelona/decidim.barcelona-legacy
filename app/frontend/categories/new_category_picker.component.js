import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import SubcategoryPicker        from './new_subcategory_picker.component';

class CategoryPicker extends Component {
  render () {
    const { categories, category, subcategory } = this.props;
    let subcategories = [];

    if (categories.length > 0 && category) {
      let categorySelected = categories.filter(c => c.id === category.id);
      if (categorySelected.length > 0) {
        subcategories = categorySelected[0].subcategories;
      }
    }
    
    var categoryList = categories.map(c => this.renderRow(c));

    return (
      <div>
        <div className="category-picker">
          <label>{I18n.t("components.category_picker.category.label")}</label>
          <ul>{categoryList}</ul>
        </div>
        <SubcategoryPicker 
          subcategory={subcategory}
          subcategories={subcategories} 
          onSelect={subcategory => this.selectSubcategory(subcategory)} />
      </div>
    );
  }

  renderRow (c) {
    const { category } = this.props;

    var selected = category && category.id === c.id;
    var name = c.name;

    var classNames = ['category-' + c.id];
    if(selected){ classNames.push('selected'); }
    var iconName = "icon category-icon-" + c.id;

    return (
      <li className={classNames.join(' ')}
          key={c.id}
          onClick={() => this.selectCategory(c)}>
        <span className="category">
          <span className={iconName}></span>
          <span className="name">{name}</span>
        </span>
      </li>
    );
  }

  selectCategory(selectedCategory ){
    const { categories, onCategorySelected } = this.props;

    const subcategories = categories
      .filter(category => {
        return category.id === selectedCategory.id
      })[0]
      .subcategories;

    onCategorySelected({
      categoryId: selectedCategory.id,
      subcategoryId: subcategories[0].id
    });
  }

  selectSubcategory(subcategory){
    const { onSubcategorySelected } = this.props;


    onSubcategorySelected(subcategory.id);
  }
}

export default connect(
  ({ categories }) => ({ categories })
)(CategoryPicker);

CategoryPicker.propTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.object,
  subcategory: PropTypes.object,
  onCategorySelected: PropTypes.func.isRequired,
  onSubcategorySelected: PropTypes.func.isRequired
};
