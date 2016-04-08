import { Component } from 'react';

export default class ProposalAuthor extends Component {
  render() {
    return this.renderAuthor();
  }

  renderAuthor() {
    const { official, fromMeeting, author } = this.props;

    if(author && !(official || fromMeeting)) {
      return this.renderHiddenOrAuthor();
    }

    return null;
  }

  renderHiddenOrAuthor() {
    const { author } = this.props;

    if (author.hidden || author.erased) {
      return (
        <span key="deleted">
          <span className="author">
          { I18n.t("proposals.show.author_deleted") }
          </span>
        </span>
      );
    } else {
      return (
        <span>
          {this.renderOfficialOrAuthor()}
          {this.renderVerifiedOrganization()}
        </span>
      );
    }
  }

  renderOfficialOrAuthor() {
    const { official, author } = this.props;

    if (official) {
      return (
        <span key="official">
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
      return (
        <span key="name">
          <span className="author">
            <a href={`/users/${author.id}`}>{author.name}</a>
          </span>
        </span>
      );
    }
  }

  renderVerifiedOrganization() {
    const { author } = this.props;

    if (author.verified_organization) {
      return (
        <span key="organization">
          <span className="bullet">&nbsp;&bull;&nbsp;</span>
          <span className="label round is-association">
            {I18n.t("shared.collective")}
          </span>
        </span>
      );
    }

    return null;
  }
}
