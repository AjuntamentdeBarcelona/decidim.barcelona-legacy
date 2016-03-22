import FilterLink      from '../filters/filter_link.component';
import ProposalVoteBox from './proposal_vote_box.component';

export default function ({
  id,
  title,
  url,
  summary,
  created_at,
  category,
  subcategory,
  scope_,
  district,
  source,
  total_votes,
  total_comments,
  voted,
  votable,
  official,
  from_meeting,
  author
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
              {renderAuthorInfo(official, from_meeting, author)}
            </p>
            <div className="proposal-description">
              <p>{ summary }</p>
              <div className="truncate"></div>
            </div>
            <div className="bottom-bar">
              <div className="item-meta">
                {renderMetaScope(scope_, district)}
                <FilterLink name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} />
                <FilterLink name="subcategory_id" value={subcategory.id} label={subcategory.name} />
              </div>
            </div>
          </div>
        </div>
        <aside className="small-12 medium-3 column">
          <ProposalVoteBox proposalId={ id } voted={ voted } votable={ votable } totalVotes={ total_votes } totalComments={ total_comments } />
        </aside>
      </div>
    </div>
  );
}

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

function renderAuthorInfo(official, from_meeting, author) {
  let result = [];

  if(!(official || from_meeting)) {
    if (author.hidden || author.erased) {
      result.push(
        <span key="deleted">
          <span className="bullet">&nbsp;&bull;&nbsp;</span>
          <span className="author">
          { I18n.t("proposals.show.author_deleted") }
          </span>
        </span>
      );
    } else {
      if (official) {
        result.push(
          <span key="official">
            <span className="bullet">&nbsp;&bull;&nbsp;</span>
            <span className="author">
              <a href="">{author.name}</a>
            </span>
            <span className="bullet">&nbsp;&bull;&nbsp;</span>
            <span className={`label round level-${author.official_level}`}>
              {I18n.t(`officials.level_${author.official_level}`)}
            </span>
          </span>
        );
      } else {
        result.push(
          <span key="name">
            <span className="bullet">&nbsp;&bull;&nbsp;</span>
            <span className="author">
              <a href={`/users/${author.id}`}>{author.name}</a>
            </span>
          </span>
        );
      }

      if (author.verified_organization) {
        result.push(
          <span key="organization">
            <span className="bullet">&nbsp;&bull;&nbsp;</span>
            <span className="label round is-association">
              {I18n.t("shared.collective")}
            </span>
          </span>
        );
      }
    }
  }

  return result;
}
