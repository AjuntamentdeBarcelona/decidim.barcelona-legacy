import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './proposals.actions';

import SocialShareButtons       from '../application/social_share_buttons.component';
import Loading                  from '../application/loading.component';
import DangerLink               from '../application/danger_link.component';
import FilterMeta               from '../filters/filter_meta.component';
import FollowButton             from '../follows/follow_button.component';
import Comments                 from '../comments/comments.component';

import ProposalStatusBadge      from './proposal_status_badge.component';
import ProposalInfoExtended     from './proposal_info_extended.component';
import ProposalActionPlans      from './proposal_action_plans.component';
import ProposalAnswerMessage    from './proposal_answer_message.component';
import ProposalVoteButton       from './proposal_vote_button.component';
import ProposalVoteLimit        from './proposal_vote_limit.component';

import RelatedMeetings          from '../meetings/related_meetings.component';

import htmlToReact              from '../application/html_to_react';
import simpleFormat             from '../application/simple_format';

class ProposalShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { fetchProposal, fetchAnswer, proposalId } = this.props;

    fetchProposal(proposalId).then(() => {
      fetchAnswer(proposalId).then(() => {
        this.setState({ loading: false });
      })
    });
  }

  render() {
    return (
      <div className="proposal-show component">
        <Loading show={this.state.loading} />
        {this.renderProposal()}
      </div>
    );
  }

  renderProposal() {
    const { proposal, fetchRelatedMeetings, participatoryProcess, decidimIconsUrl } = this.props;
    const { step } = participatoryProcess;
    const { flags } = step;

    if (proposal.id) {
      const { 
        id,
        code,
        url, 
        title, 
        created_at, 
        author,
        summary,
        voted,
        votable,
        total_votes,
        total_comments,
        scope_,
        district,
        category,
        subcategory,
        editable,
        flagged,
        hidden,
        can_hide,
        can_hide_author,
        external_url,
        conflictive
      } = proposal;

      return (
        <div className={(hidden || (author && author.hidden)) ? 'faded' : ''} id={`proposal_${proposal.id}`}>
          <div>
            <ProposalVoteLimit />
            <div className="row column view-header">
              {this.renderEditButton(editable, url)}
              <h2 className="heading2">{title}</h2>
              <ProposalInfoExtended
                id={ id }
                created_at={ created_at }
                author={ author }
                totalComments={ total_comments } 
                flagged={ flagged } />
              <div className="js-moderator-proposal-actions margin">
                {this.renderHideButton(id, can_hide)}
                {this.renderHideAuthorButton(id, can_hide_author)}
                {this.renderBuildActionPlanButton(id)}
              </div>
            </div>
            {this.renderConflictiveWarning(conflictive)}
            <div className="row">
              <div className="columns section view-side mediumlarge-4 mediumlarge-push-8 large-3 large-push-9">
                <div className="card extra">
                  <div className="card__content">
                    <span className="extra__suport-number">{ total_votes }</span>
                    <span className="extra__suport-text">{ I18n.t("votes.supports") }</span>
                    <ProposalVoteButton
                      className="expanded button--sc extra"
                      voted={voted}
                      votable={votable}
                      proposalId={id}
                    />
                    <br />
                    <FollowButton 
                      followingId={id}
                      followingType={'Proposal'} />
                  </div>
                </div>
                <div className="reference">
                  Referencia: {code}
                </div>
                <div className="text-center">
                  <SocialShareButtons 
                    title={title}
                    url={url}
                    modalId={`proposal_share_${id}`}
                    decidimIconsUrl={decidimIconsUrl}
                    linkText={I18n.t('components.proposal_show.share')} />
                </div>
              </div>
              <div className="columns mediumlarge-8 mediumlarge-pull-4">
                <div className="section">
                  <ProposalStatusBadge flags={flags} answer={proposal.answer} />
                  {htmlToReact(simpleFormat(summary))}
                  <br />
                  {this.renderExternalUrl(external_url)}
                  <FilterMeta 
                    scope={ scope_ }
                    district={ district }
                    category={ category }
                    subcategory={ subcategory } 
                    useServerLinks={ true }
                    disableScope={ !flags.enable_proposal_scope } />
                </div>
                <ProposalAnswerMessage answer={proposal.answer} />
                <div className="section">
                  <ProposalActionPlans />
                </div>
                <div className="section">
                  <RelatedMeetings model={proposal} fetchRelatedMeetings={fetchRelatedMeetings} useServerLinks={ true } />
                </div>
              </div>
            </div>
          </div>
          <div className="expanded">
            <div className="wrapper--inner">
              <div className="row">
                <div className="columns large-9" id="comments">
                  <Comments commentable={{...proposal, type: 'Proposal'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  renderEditButton(editable, url) {
    if (editable) {
      return (
        <a href={`${url}/edit`} className="edit-proposal button success tiny radius right">
          <i className="icon-edit"></i>
          { I18n.t("proposals.show.edit_proposal_link") }
        </a>
      );
    }

    return null;
  }

  renderHideButton(id, hasPermission) {
    const { hideProposal } = this.props;

    if (hasPermission) {
      return (
        <DangerLink onClick={() => hideProposal(id)}>
          { I18n.t('admin.actions.hide') }
        </DangerLink>
      );
    }
    return null;
  }

  renderHideAuthorButton(id, hasPermission) {
    const { hideProposalAuthor } = this.props;

    if (hasPermission) {
      return (
        <span>
          <span>&nbsp;|&nbsp;</span>
          <DangerLink onClick={() => hideProposalAuthor(id)}>
            { I18n.t('admin.actions.hide_author') }
          </DangerLink>
        </span>
      );
    }
    return null;
  }

  renderBuildActionPlanButton(id) {
    const { session, participatoryProcess } = this.props;

    if (session.can_create_action_plan) {
      return (
        <span>
          <span>&nbsp;|&nbsp;</span>
          <a href={`/${participatoryProcess.id}/${participatoryProcess.step.id}/action_plans/build_from_proposal?proposal_id=${id}`}>
            { I18n.t('admin.actions.build_action_plan') }
          </a>
        </span>
      );
    }
    return null;
  }

  renderConflictiveWarning(isConflictive) {
    if (isConflictive) {
      return (
        <div className="alert-box alert radius margin-top">
          <strong>{ I18n.t("proposals.show.flag") }</strong>
        </div>
      );
    }
    
    return null;
  }

  renderExternalUrl(externalUrl) {
    if (externalUrl) {
      return (
        <div className="document-link">
          { htmlToReact(simpleFormat(externalUrl)) }
        </div>
      );
    }

    return null;
  }
}

export default connect(
  ({ session, proposal, participatoryProcess, decidimIconsUrl }) => ({ 
    session,
    proposal,
    participatoryProcess,
    decidimIconsUrl
  }),
  actions
)(ProposalShow);

ProposalShow.propTypes = {
  session: PropTypes.object.isRequired,
  proposalId: PropTypes.string.isRequired,
  decidimIconsUrl: PropTypes.string.isRequired,
  proposal: PropTypes.object,
  fetchProposal: PropTypes.func.isRequired,
  fetchAnswer: PropTypes.func.isRequired,
  fetchRelatedMeetings: PropTypes.func.isRequired,
  hideProposal: PropTypes.func.isRequired,
  hideProposalAuthor: PropTypes.func.isRequired,
  participatoryProcess: PropTypes.object.isRequired
};
