import { PropTypes }        from 'react';
import ellipsis             from 'html-ellipsis';

import ActionPlanStatistics from './action_plan_statistics.component';
import SocialShareButtons   from '../application/social_share_buttons.component';
import FilterMeta           from '../filters/filter_meta.component';

import htmlToReact          from '../application/html_to_react';

const DESCRIPTION_MAX_CHARACTERS = 200;

const ActionPlan = ({
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
  <div id={`action_plan${id}`} className="proposal column">
    <article className="card card--action">
      <div className="card__content">
        <a href="/action-view" className="card__link">
          <h5 className="card__title"><a href={url}>{ title }</a></h5>
        </a>
        <p className="card__desc">
          {htmlToReact(ellipsis(description, DESCRIPTION_MAX_CHARACTERS, true))}
        </p>
        <FilterMeta
          scope={ scope_ }
          district={ district }
          category={ category }
          subcategory={ subcategory } />
      </div>
      <div className="card__footer">
        <ul className="card-data">
          <li className="card-data__item">
            <span className="card-data__item__number">{statistics.related_proposals_count}</span>{I18n.t('components.action_plan_statistics.related_proposals_count')}
          </li>
          <li className="card-data__item">
            <span className="card-data__item__number">{statistics.supports_count}</span>{I18n.t('components.action_plan_statistics.supports_count')}
          </li>
          <li className="card-data__item">
            <span className="card-data__item__number">{statistics.comments_count}</span>{I18n.t('components.action_plan_statistics.comments_count')}
          </li>
        </ul>
      </div>
    </article>
  </div>


  //         <div className="bottom-bar">
  //           
  //         </div>
  //       </div>
  //     </div>
  //     <aside id={`action_plan_${id}_statistics`} className="actionplan-statistics small-12 medium-4 column">
  //       <div className="action-plan-statistics-inner">
  //         <ActionPlanStatistics statistics={statistics}></ActionPlanStatistics>
  //         <hr></hr>
  //         <SocialShareButtons title={title} url={url} />
  //       </div>
  //     </aside>
  //   </div>
  // </div>
);

ActionPlan.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  subcategory: PropTypes.object.isRequired,
  scope_: PropTypes.string.isRequired,
  district: PropTypes.object,
  statistics: PropTypes.object
};

export default ActionPlan;
