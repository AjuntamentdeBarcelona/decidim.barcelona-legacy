import ellipsis             from 'html-ellipsis';

import ActionPlanStatistics from './action_plan_statistics.component';
import SocialShareButtons   from '../application/social_share_buttons.component';
import FilterMeta           from '../filters/filter_meta.component';

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
  district,
  statistics
}) => (
  <div id={`action_plan_${id}`} className="proposal clear">
    <div className="row">
      <div className="small-12 medium-8 column">
        <div className="proposal-content">
          <span className="label-proposal">{ I18n.t('components.action_plan.label') }</span>

          <h3><a href={url}>{ title }</a></h3>

          <p className="proposal-info">
            <span>{ created_at }</span>
          </p>

          <div 
            className="proposal-description"
            dangerouslySetInnerHTML={{ __html: ellipsis(description.autoLink(), DESCRIPTION_MAX_CHARACTERS) }} />

          <div className="bottom-bar">
            <FilterMeta 
              scope={ scope_ }
              district={ district }
              category={ category }
              subcategory={ subcategory } />
          </div>
        </div>
      </div>
      <aside id={`action_plan_${id}_statistics`} className="actionplan-statistics small-12 medium-4 column">
        <div className="action-plan-statistics-inner">
          <ActionPlanStatistics statistics={statistics}></ActionPlanStatistics>
          <hr></hr>
          <SocialShareButtons title={title} url={url} />
        </div>
      </aside>
    </div>
  </div>
);
