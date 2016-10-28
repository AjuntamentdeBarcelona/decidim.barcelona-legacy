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
    const { scope, district, useServerLinks, namespace, disableScope } = this.props;

    if (disableScope) {
      return null;
    }
    
    if (scope === "city") {
      if (useServerLinks) {
        return (
          <li key="scope_city"><FilterServerLink name="scope" value="city" cssClass="bcn-icon-localitzacio bcn-icon" label={I18n.t("components.filter_option.city")} namespace={namespace} /></li>
        );
      } else {
        return (
          <li key="scope_city"><FilterLink name="scope" value="city" cssClass="bcn-icon-localitzacio bcn-icon" label={I18n.t("components.filter_option.city")} /></li>
        );
      }
    }

    if (useServerLinks && district) {
      return (
        <li key="scope_district"><FilterServerLink name="district" value={district.id} cssClass="bcn-icon-localitzacio bcn-icon" label={district.name} namespace={namespace} /></li>
      );
    } else if (district) {
      return (
        <li key="scope_district"><FilterLink name="district" value={district.id} cssClass="bcn-icon-localitzacio bcn-icon" label={district.name} /></li>
      );
    }

    return null;
  }

  renderMetaCategories() {
    const { category, subcategory, useServerLinks, namespace } = this.props;
    let links = [];

    if (useServerLinks) {
      links = [
        <li key="category_id"><FilterServerLink name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`}  namespace={namespace} /></li>,
        <li key="subcategory_id"><FilterServerLink name="subcategory_id" value={subcategory.id} label={subcategory.name} namespace={namespace} /></li>
      ];
    } else {
      links = [
        <li key="category_id"><FilterLink name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} /></li>,
        <li key="subcategory_id"><FilterLink name="subcategory_id" value={subcategory.id} label={subcategory.name} /></li>
      ];
    }

    return links;
  }
}

FilterMeta.propTypes = {
  disableScope: PropTypes.bool,
  scope: PropTypes.string.isRequired,
  district: PropTypes.object,
  category: PropTypes.object,
  subcategory: PropTypes.object,
  useServerLinks: PropTypes.bool,
  namespace: PropTypes.string
};
