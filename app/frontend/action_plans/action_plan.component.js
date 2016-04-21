import truncate   from 'html-truncate';
import FilterMeta from '../filters/filter_meta.component';

import { Link } from 'react-router';

const DESCRIPTION_MAX_CHARACTERS = 300;

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

          <h3><Link to={`/action_plans/${id}`}>{ title }</Link></h3>

          <p className="proposal-info">
            <span>{ created_at }</span>
          </p>

          <div 
            className="proposal-description"
            dangerouslySetInnerHTML={{ __html: truncate(description.autoLink(), DESCRIPTION_MAX_CHARACTERS) }} />

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
