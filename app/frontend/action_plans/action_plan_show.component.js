import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './action_plans.actions';

import SocialShareButtons       from '../application/social_share_buttons.component';
import Icon                     from '../application/icon.component';
import Loading                  from '../application/loading.component';
import DangerLink               from '../application/danger_link.component';
import FilterMeta               from '../filters/filter_meta.component';

import ActionPlanStatistics     from './action_plan_statistics.component';
import ActionPlanProposals      from './action_plan_proposals.component';
import WeightControl            from './weight_control.component';

import Comments                 from '../comments/comments.component';
import RelatedMeetings          from '../meetings/related_meetings.component';

import htmlToReact              from '../application/html_to_react';

class ActionPlanShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      editable: this.props.session.is_reviewer
    }
  }

  componentDidMount() {
    const { fetchActionPlan } = this.props;

    fetchActionPlan(this.props.actionPlanId).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div style={{ position: 'relative', minHeight: '30em' }} className="action-plan-show component">
        <Loading show={this.state.loading} />
        {this.renderActionPlan()}
      </div>
    );
  }

  renderActionPlan() {
    const { actionPlan, fetchRelatedMeetings, decidimIconsUrl } = this.props;

    if (actionPlan.id) {
      const { 
        id,
        title, 
        url,
        description,
        created_at,
        scope_,
        category,
        subcategory,
        district,
        statistics,
        total_comments
      } = actionPlan;

      return (
        <div className="action-plan-show">
          <div>
            <div className="row column view-header">
              <h2 className="heading2">{title}</h2>
              <div className="author-data author-data--noavatar">
                <div className="author-data__main">
                  <div className="author author--inline">
                    {created_at}
                  </div>
                </div>
                <div className="author-data__extra">
                  <a href="#comments" title="Comentarios">
                    <Icon name="comment-square" className="icon--small" ariaLabel="Comentarios" role="img" />
                    { ' ' + total_comments }
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="columns section view-side mediumlarge-4 mediumlarge-push-8 large-3 large-push-9">
                <ActionPlanStatistics statistics={statistics} />
                <div className="text-center">
                  <SocialShareButtons 
                      title={title}
                      url={url}
                      modalId={`action_plan_share_${id}`}
                      decidimIconsUrl={decidimIconsUrl}
                      linkText={I18n.t('components.action_plan_show.share')} />
                </div>
              </div>
              <div className="columns mediumlarge-8 mediumlarge-pull-4">
                <div className="section">
                  <div>{htmlToReact(description)}</div><br />
                  <FilterMeta 
                    scope={ scope_ }
                    district={ district }
                    category={ category }
                    subcategory={ subcategory } 
                    namespace="action_plans"
                    useServerLinks={ true } />
                </div>
                <div className="section">
                  <ActionPlanProposals actionPlan={actionPlan} editable={this.state.editable} />
                </div>
                <div className="section">
                  <RelatedMeetings model={actionPlan} fetchRelatedMeetings={fetchRelatedMeetings} useServerLinks={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="expanded">
            <div className="wrapper--inner">
              <div className="row">
                <div className="columns large-9" id="comments">
                  <Comments commentable={{...actionPlan, type: 'ActionPlan'}} />
                </div>
              </div>
            </div>
          </div> 
        </div>        
      );
    }
    return null;
  }

  renderNotice(){
    if(this.props.actionPlan && this.props.actionPlan.deleted){
      return (
        <div className="alert-box warning">{I18n.t("components.action_plan_show.deleted")}</div>
      )
    }
  }

  renderApproveButton() {
    if(this.props.actionPlan && this.props.actionPlan.approved){
      return (<span className="right">
              {I18n.t("components.action_plan_show.approved")}
              </span>);
    } else {
      return (
        <DangerLink onClick={() => this.props.approveActionPlan(this.props.actionPlan.id)}
          className="approve-proposal button default tiny radius right">
          <i className="icon-edit"></i>
          { I18n.t("components.action_plan_show.approve") }
        </DangerLink>
      )
    }
  }

  renderReviewerActions() {
    const { actionPlan, deleteActionPlan, changeWeight } = this.props;
    const { id, weight, new_revision_url } = actionPlan;

    if (this.state.editable) {
      return (
        <span>
          <DangerLink className="delete-action-plan button danger tiny radius right" onClick={() => deleteActionPlan(id) }>
            <i className="icon-cross"></i>
            { I18n.t("components.action_plan_show.delete") }
          </DangerLink>

          <a href={new_revision_url} className="edit-proposal button success tiny radius right">
            <i className="icon-edit"></i>
            { I18n.t("components.action_plan_show.new_revision") }
          </a>

          { this.renderApproveButton() }

          <span className="right">
            <WeightControl
              weight={ weight }
              onUpdateWeight={ (weight) => changeWeight(id, weight)} />
          </span>
        </span>
      );
    }
  }
}

export default connect(
  ({ session, actionPlan, decidimIconsUrl }) => ({ session, actionPlan, decidimIconsUrl }),
  actions
)(ActionPlanShow);

ActionPlanShow.propTypes = {
  session: PropTypes.object.isRequired,
  fetchActionPlan: PropTypes.func.isRequired,
  fetchRelatedMeetings: PropTypes.func.isRequired,
  actionPlanId: PropTypes.string.isRequired,
  decidimIconsUrl: PropTypes.string.isRequired,
  actionPlan: PropTypes.object,
  approveActionPlan: PropTypes.func.isRequired,
  deleteActionPlan: PropTypes.func.isRequired,
  changeWeight: PropTypes.func.isRequired
};
