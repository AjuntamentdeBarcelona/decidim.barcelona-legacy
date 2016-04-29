import ActionPlansFilters  from './action_plans_filters.component';

export default function () {
  return (
    <aside className="sidebar" role="complementary">
      <div className="sidebar-section proposal-filter-menu collapsed">
        <h2 className="title">{I18n.t('proposals.index.filter.title')}<span className="toggle-menu"></span></h2>
        <div className="sidebar-section-content">
          <ActionPlansFilters />
        </div>
      </div>
    </aside>
  )
}
