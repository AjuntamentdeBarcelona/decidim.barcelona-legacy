import { Component }    from 'react';

import FilterLink       from '../filters/filter_link.component';
import FilterServerLink from '../filters/filter_server_link.component';

export default class ProposalMeta extends Component {
  render() {
    return (
      <div className="item-meta">
        {this.renderMetaScope()}
        {this.renderMetaCategories()}
      </div>
    );
  }

  renderMetaScope() {
    const { scope, district, useServerLinks } = this.props;

    if (scope === "city") {
      if (useServerLinks) {
        return (
          <FilterServerLink name="scope" value="city" cssClass="bcn-icon-localitzacio bcn-icon" label={I18n.t("components.filter_option.city")} />
        );
      } else {
        return (
          <FilterLink name="scope" value="city" cssClass="bcn-icon-localitzacio bcn-icon" label={I18n.t("components.filter_option.city")} />
        );
      }
    }

    if (useServerLinks && district) {
      return (
        <FilterServerLink name="district" value={district.id} cssClass="bcn-icon-localitzacio bcn-icon" label={district.name} />
      );
    } else if (district) {
      return (
        <FilterLink name="district" value={district.id} cssClass="bcn-icon-localitzacio bcn-icon" label={district.name} />
      );
    }

    return null;
  }

  renderMetaCategories() {
    const { category, subcategory, useServerLinks } = this.props;
    let links = [];

    if (useServerLinks) {
      links = [
        <FilterServerLink key="category_id" name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} />,
        <FilterServerLink key="subcategory_id" name="subcategory_id" value={subcategory.id} label={subcategory.name} />
      ];
    } else {
      links = [
        <FilterLink key="category_id" name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} />,
        <FilterLink key="subcategory_id" name="subcategory_id" value={subcategory.id} label={subcategory.name} />
      ];
    }

    return links;
  }
}

