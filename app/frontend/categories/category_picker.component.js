import { Component, PropTypes } from 'react';

import SubcategoryPicker        from './subcategory_picker.component';

export default class CategoryPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: props.selectedCategoryId,
      selectedSubcategoryId: props.selectedSubcategoryId,
      subcategories: props.subcategories.sort( () => Math.round(Math.random())-0.5 )
    }
  }

  render () {
    let selectedCategoryId = this.state.selectedCategoryId;
    let selectedSubcategoryId = this.state.selectedSubcategoryId;

    if (this.props.categories.length === 1) {
      selectedCategoryId = this.props.categories[0].id;
      selectedSubcategoryId = this.props.subcategories.find(sc => sc.categoryId === selectedCategoryId).id;
    }

    return (
      <div>
        {this.axisPicker()}
        {this.actionLinePicker()}

        <input type="hidden"
               name={this.props.categoryInputName}
               value={selectedCategoryId} />

        <input type="hidden"
               name={this.props.subcategoryInputName}
               value={selectedSubcategoryId} />
      </div>
    );
  }

  renderRow (category) {
    var selected = this.state.selectedCategoryId === category.id;
    var name = category.name;

    var classNames = ['category-' + category.id];

    return (
      <div className={classNames.join(' ')}
          key={category.id}
          onClick={() => this.selectCategory(category)}>
        <span className="category">
          <input type="checkbox" checked={selected} />
          <label className="name">{name}</label>
        </span>
      </div>
    );
  }

  axisPicker() {
    if (this.props.categories.length > 1) {
      var category = this.props.categories.map(category => this.renderRow(category));

      return (
        <div className="category-picker">
          <label>{I18n.t("components.category_picker.category.label")}</label>
          <ul>{category}</ul>
        </div>
      );
    }
    return null;
  }
  actionLinePicker() {
    const { participatoryProcessId } = this.props;

    if(this.state.selectedCategoryId){
      return (
        <SubcategoryPicker
            categoryId={this.state.selectedCategoryId}
            subcategories={this.state.subcategories}
            selectedId={this.state.selectedSubcategoryId}
            onSelect={ (actionLine) => this.setState({selectedSubcategoryId: actionLine.id}) }
            participatoryProcessId={participatoryProcessId}
        />
      );
    }
  }

  selectCategory(category){
    var state = {selectedCategoryId: category.id};

    if(this.state.selectedCategoryId !== category.id){
      state = {...state, selectedSubcategoryId: null };
    }

    this.setState(state);
  }
}

CategoryPicker.propTypes = {
  selectedCategoryId: PropTypes.string,
  selectedSubcategoryId: PropTypes.string,
  subcategories: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  categoryInputName: PropTypes.string.isRequired,
  subcategoryInputName: PropTypes.string.isRequired,
  participatoryProcessId: PropTypes.object.isRequired
};
