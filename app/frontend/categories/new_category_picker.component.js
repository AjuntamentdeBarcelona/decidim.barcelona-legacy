import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { updateProposal }     from '../proposals/proposals.actions';

import SubcategoryPicker      from './new_subcategory_picker.component';

class CategoryPicker extends Component {
  render () {
    const { categories, proposal } = this.props;
    const subcategories = (categories.length > 0 && proposal.category) ? categories
      .filter(category => {
        return proposal && category.id === proposal.category.id
      })[0]
      .subcategories : [];

    var category = categories.map(category => this.renderRow(category));

    return (
      <div>
        <div className="category-picker">
          <label>{I18n.t("components.category_picker.category.label")}</label>
          <ul>{category}</ul>
        </div>
        <SubcategoryPicker 
          subcategories={subcategories} 
          onSelect={subcategory => this.selectSubcategory(subcategory)} />
      </div>
    );
  }

  renderRow (category) {
    const { proposal } = this.props;

    var selected = proposal.category && proposal.category.id === category.id;
    var name = category.name;

    var classNames = ['category-' + category.id];
    if(selected){ classNames.push('selected'); }
    var iconName = "icon category-icon-" + category.id;

    return (
      <li className={classNames.join(' ')}
          key={category.id}
          onClick={() => this.selectCategory(category)}>
        <span className="category">
          <span className={iconName}></span>
          <span className="name">{name}</span>
        </span>
      </li>
    );
  }

  selectCategory(selectedCategory ){
    const { categories, proposal } = this.props;

    const subcategories = categories
      .filter(category => {
        return category.id === selectedCategory.id
      })[0]
      .subcategories;

    this.props.updateProposal(proposal.id, {
      category_id: selectedCategory.id,
      subcategory_id: subcategories[0].id
    });
  }

  selectSubcategory(subcategory){
    const { proposal } = this.props;


    this.props.updateProposal(proposal.id, {
      subcategory_id: subcategory.id
    });
  }
}

function mapStateToProps({ categories, proposal }) {
  return { categories, proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProposal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPicker);
