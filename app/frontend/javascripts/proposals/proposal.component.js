import ProposalVoteBox from './proposal_vote_box.component';

export default function ({
  id,
  title,
  url,
  summary,
  created_at,
  category,
  subcategory,
  scope,
  district,
  source
}) {
  return (
    <div className="proposal clear">
      <div className="row">
        <div className="small-12 medium-9 column">
          <div className="proposal-content">
            <span className={`proposal-badge ${source}-badge`}></span>
            <span className="label-proposal">{ I18n.t('proposals.proposal.proposal') }</span>
            <h3><a href={url}>{ title }</a></h3>
            <p className="proposal-info">
              <span>{ created_at }</span>
              <span className="bullet">&nbsp;&bull;&nbsp;</span>
              <span className="author">Author</span>
              <span className="bullet">&nbsp;&bull;&nbsp;</span>
              <span className="label round level-2">Level</span>
              <span className="bullet">&nbsp;&bull;&nbsp;</span>
              <span className="label round is-association">Collectiu</span>
            </p>
            <div className="proposal-description">
              <p>{ summary }</p>
              <div className="truncate"></div>
            </div>
            <div className="bottom-bar">
              <div className="item-meta">
                {renderMetaScope(scope, district)}
                <a className="category">
                  <i className={`category-icon category-icon-${category.id}`} />
                  { category.name }
                </a>
                <a className="subcategory">{ subcategory.name }</a>
              </div>
            </div>
          </div>
        </div>
        <aside className="small-12 medium-3 column">
          <ProposalVoteBox />
        </aside>
      </div>
    </div>
  );
}

function renderMetaScope(scope, district) {
  if (scope === "city") {
    return (
      <a>
        <span className="bcn-icon-localitzacio bcn-icon" />
        { I18n.t("components.filter_option.city") }
      </a>
    );
  }
  return (
    <a>
      <span className="bcn-icon-localitzacio bcn-icon" />
      { district.name }
    </a>
  );
}

