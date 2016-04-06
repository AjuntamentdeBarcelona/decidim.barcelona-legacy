export default function ({
  created_at,
  official,
  from_meeting,
  author
}) {
  return (
    <p className="proposal-info">
      <span>{ created_at }</span>
      {renderAuthorInfo(official, from_meeting, author)}
    </p>
  );
}

function renderAuthorInfo(official, from_meeting, author) {
  let result = [];

  if(author && !(official || from_meeting)) {
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
