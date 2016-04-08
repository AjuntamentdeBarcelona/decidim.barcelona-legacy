import { Component }                   from 'react';
import { connect }                     from 'react-redux';
import { bindActionCreators }          from 'redux';

import { 
  fetchProposal, 
  updateAnswer,
  hideProposal,
  hideProposalAuthor
} from './proposals.actions';
import { fetchCategories }             from '../categories/categories.actions';
import { fetchDistricts }              from '../districts/districts.actions';

import Loading                         from '../application/loading.component';
import SocialShareButtons              from '../application/social_share_buttons.component';

import CategoryPicker                  from '../categories/new_category_picker.component';

import ProposalAnswerBox               from './proposal_answer_box.component';
import ProposalBadge                   from './proposal_badge.component';
import ProposalInfoExtended            from './proposal_info_extended.component';
import ProposalMeta                    from './proposal_meta.component';
import ProposalVoteBox                 from './proposal_vote_box.component';
import ProposalReferences              from './proposal_references.component';
import ProposalMeetings                from './proposal_meetings.component';
import ScopePicker                     from './scope_picker.component';

class ProposalShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { session } = this.props;

    this.props.fetchProposal(this.props.proposalId);
    this.props.fetchCategories();
    this.props.fetchDistricts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.proposal.id) {
      this.setState({ loading: false });
    }
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
    const { proposal, hideProposal, hideProposalAuthor } = this.props;

    if (proposal.id) {
      const { 
        id,
        url, 
        title, 
        source, 
        created_at, 
        official, 
        from_meeting, 
        author,
        summary,
        closed,
        voted,
        votable,
        total_votes,
        total_comments,
        scope_,
        district,
        category,
        subcategory,
        editable,
        conflictive,
        external_url,
        hidden,
        can_hide,
        can_hide_author,
        flagged
      } = proposal;

      return (
        <div>
          <div className={(hidden || author.hidden) ? 'row faded' : 'row'} id={`proposal_${proposal.id}`}>
            <div className="small-12 medium-9 column">
              <i className="icon-angle-left left"></i>&nbsp;

              <a className="left back" href="/proposals">
                {I18n.t('proposals.show.back_link')}
              </a>

              {this.renderEditButton(editable, url)}

              <h2>
                <a href={url}>{title}<ProposalBadge source={source} /></a>
              </h2>

              {this.renderConflictiveWarning(conflictive)}

              <ProposalInfoExtended
                id={ id }
                created_at={ created_at }
                official={ official }
                from_meeting={ from_meeting }
                author={ author }
                totalComments={ total_comments } 
                flagged={ flagged } />

              <div className="proposal-description">{ summary }</div>

              {this.renderExternalUrl(external_url)}

              <ProposalMeta 
                scope={ scope_ }
                district={ district }
                category={ category }
                subcategory={ subcategory } />

              <ProposalReferences />

              <div className="js-moderator-proposal-actions margin">
                {this.renderHideButton(id, can_hide)}
                {this.renderHideAuthorButton(id, can_hide_author)}
              </div>

              {this.renderReviewBox()}
            </div>

            <aside className="small-12 medium-3 column">
              <div className="sidebar-divider"></div>
              <h3>{ I18n.t("votes.supports") }</h3>
              <ProposalVoteBox 
                hideButton={ closed }
                proposalId={ proposal.id } 
                proposalTitle={ title } 
                proposalUrl={ url } 
                voted={ voted } 
                votable={ votable } 
                totalVotes={ total_votes } 
                totalComments={ total_comments } />
              <div className="sidebar-divider"></div>
              <h3>{ I18n.t("proposals.show.share") }</h3>
              <SocialShareButtons 
                title={ title }
                url={ url }/>
            </aside>
          </div>

          <ProposalMeetings />
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
    if (hasPermission) {
      return (
        <a onClick={() => hideProposal(id)}>
          { I18n.t('admin.actions.hide') }
        </a>
      );
    }
    return null;
  }

  renderHideAuthorButton(id, hasPermission) {
    if (hasPermission) {
      return (
        <span>
          <span>&nbsp;|&nbsp;</span>
          <a onClick={() => hideProposalAuthor(id)}>
            { I18n.t('admin.actions.hide_author') }
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
        <div 
          className="document-link" 
          dangerouslySetInnerHTML={{ __html: externalUrl.autoLink() }} />
      );
    }

    return null;
  }

  renderReviewBox() {
    const { session, proposal } = this.props;
    const { id, answer } = proposal;

    if (session.is_reviewer) {
      return (
        <div>
          <h2>{I18n.t('proposals.edit.editing')}</h2>
          <ScopePicker />
          <CategoryPicker />
          <ProposalAnswerBox 
            answerMessage={answer && answer.message}
            answerStatus={answer && answer.status}
            onButtonClick={(answerParams) => this.props.updateAnswer(proposal.id, answer, answerParams)} 
          />
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps({ session, proposal }) {
  return { session, proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchProposal, 
    updateAnswer, 
    fetchCategories, 
    fetchDistricts,
    hideProposal,
    hideProposalAuthor
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalShow);
