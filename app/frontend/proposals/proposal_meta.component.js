import FilterLink from '../filters/filter_link.component';

export default ({
  scope,
  district,
  category,
  subcategory
}) => (
  <div className="item-meta">
    {renderMetaScope(scope, district)}
    <FilterLink name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} />
    <FilterLink name="subcategory_id" value={subcategory.id} label={subcategory.name} />
  </div>
);

function renderMetaScope(scope, district) {
  if (scope === "city") {
    return (
      <FilterLink name="scope" value="city" cssClass="bcn-icon-localitzacio bcn-icon" label={I18n.t("components.filter_option.city")} />
    );
  }
  return (
    <FilterLink name="district" value={district.id} cssClass="bcn-icon-localitzacio bcn-icon" label={district.name} />
  );
}
