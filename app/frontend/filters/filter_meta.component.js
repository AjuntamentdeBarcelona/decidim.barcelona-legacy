import { Component, PropTypes } from 'react';

import FilterLink               from './filter_link.component';
import FilterServerLink         from './filter_server_link.component';

export default class FilterMeta extends Component {
  render() {
    return (
      <ul className="item-meta tags tags--proposal">
        {this.renderMetaScope()}
        {this.renderMetaCategories()}
      </ul>
    );
  }

  renderMetaScope() {
    const { scope, district, useServerLinks, namespace } = this.props;

    if (scope === "city") {
      if (useServerLinks) {
        return (
          <li><FilterServerLink name="scope" value="city" cssClass="bcn-icon-localitzacio bcn-icon" label={I18n.t("components.filter_option.city")} namespace={namespace} /></li>
        );
      } else {
        return (
          <li><FilterLink name="scope" value="city" cssClass="bcn-icon-localitzacio bcn-icon" label={I18n.t("components.filter_option.city")} /></li>
        );
      }
    }

    if (useServerLinks && district) {
      return (
        <li><FilterServerLink name="district" value={district.id} cssClass="bcn-icon-localitzacio bcn-icon" label={district.name} namespace={namespace} /></li>
      );
    } else if (district) {
      return (
        <li><FilterLink name="district" value={district.id} cssClass="bcn-icon-localitzacio bcn-icon" label={district.name} /></li>
      );
    }

    return null;
  }

  renderMetaCategories() {
    const { category, subcategory, useServerLinks, namespace } = this.props;
    let links = [];

    if (useServerLinks) {
      links = [
        <li><FilterServerLink key="category_id" name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`}  namespace={namespace} /></li>,
        <li><FilterServerLink key="subcategory_id" name="subcategory_id" value={subcategory.id} label={subcategory.name} namespace={namespace} /></li>
      ];
    } else {
      links = [
        <li><FilterLink key="category_id" name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} /></li>,
        <li><FilterLink key="subcategory_id" name="subcategory_id" value={subcategory.id} label={subcategory.name} /></li>
      ];
    }

    return links;
  }
}

FilterMeta.propTypes = {
  scope: PropTypes.string.isRequired,
  district: PropTypes.object,
  category: PropTypes.object,
  subcategory: PropTypes.object,
  useServerLinks: PropTypes.bool,
  namespace: PropTypes.string
};
