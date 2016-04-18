import FilterMeta from '../filters/filter_meta.component';

export default ({
  id,
  url,
  title,
  description,
  created_at,
  category,
  subcategory,
  scope_,
  district
}) => (
  <div id={`action_plan_${id}`} className="proposal clear">
    <div className="row">
      <div className="small-12 medium-12 column">
        <div className="proposal-content">
          <span className="label-proposal">{ I18n.t('components.action_plan.label') }</span>

          <h3><a href={url}>{ title }</a></h3>

          <div 
            className="proposal-description"
            dangerouslySetInnerHTML={{ __html: description.autoLink() }} />

          <div className="bottom-bar">
            <FilterMeta 
              scope={ scope_ }
              district={ district }
              category={ category }
              subcategory={ subcategory } />
          </div>
        </div>
      </div>
    </div>
  </div>
);
