import { PropTypes }        from 'react';
import ellipsis             from 'html-ellipsis';

import FilterMeta           from '../filters/filter_meta.component';

import htmlToReact          from '../application/html_to_react';

const DESCRIPTION_MAX_CHARACTERS = 200;

const ActionPlan = ({
  id,
  url,
  title,
  description,
  category,
  subcategory,
  scope_,
  district,
  statistics
}) => (
  <div id={`action_plan${id}`} className="proposal column">
    <article className="card card--action">
      <div className="card__content">
        <a href={url} className="card__link">
          <h5 className="card__title">{ title }</h5>
        </a>
        <div className="card__desc">
          {htmlToReact(ellipsis(description, DESCRIPTION_MAX_CHARACTERS, true))}
        </div>
        <br />
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
);

ActionPlan.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  subcategory: PropTypes.object.isRequired,
  scope_: PropTypes.string.isRequired,
  district: PropTypes.object,
  statistics: PropTypes.object
};

export default ActionPlan;
