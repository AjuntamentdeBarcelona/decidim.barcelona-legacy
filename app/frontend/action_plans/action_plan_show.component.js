import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  fetchActionPlan,
  deleteActionPlan,
  approveActionPlan
} from './action_plans.actions';

import Loading            from '../application/loading.component';
import DangerLink         from '../application/danger_link.component';
import FilterMeta         from '../filters/filter_meta.component';

import ActionPlanReviewer from './action_plan_reviewer.component';


class ActionPlanShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { session } = this.props;

    this.props.fetchActionPlan(this.props.actionPlanId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.actionPlan.id) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="action-plan-show component">
        <Loading show={this.state.loading} />
        {this.renderActionPlan()}
      </div>
    );
  }

  renderActionPlan() {
    const { actionPlan } = this.props;

    if (actionPlan.id) {
      const { 
        id,
        url,
        edit_url,
        deleted,
        new_revision_url,
        title, 
        description,
        created_at,
        scope_,
        category,
        subcategory,
        district
      } = actionPlan;

      return (
        <div>
          <div className="row" id={`action_plan_${actionPlan.id}`}>
            <div className="small-12 medium-12 column">
              <i className="icon-angle-left left"></i>&nbsp;

              <a className="left back" href="/action_plans">
                {I18n.t('proposals.show.back_link')}
              </a>

              <DangerLink className="delete-proposal button danger tiny radius right" onClick={ () => this.props.deleteActionPlan(this.props.actionPlan.id) }>
                <i className="icon-cross"></i>
                { I18n.t("components.action_plan_show.delete") }
              </DangerLink>

              <a href={edit_url} className="edit-proposal button success tiny radius right">
                <i className="icon-edit"></i>
                { I18n.t("components.action_plan_show.edit") }
              </a>

              <a href={new_revision_url} className="edit-proposal button success tiny radius right">
                <i className="icon-edit"></i>
                { I18n.t("components.action_plan_show.new_revision") }
              </a>

              { this.renderApproveButton() }

              { this.renderNotice() }

              <h2>
                <a href={url}>{title}</a>
              </h2>

              <p className="proposal-info">
                <span>{ created_at }</span>
              </p>

              <div 
                className="proposal-description"
                dangerouslySetInnerHTML={{ __html: description.autoLink() }} />

              <FilterMeta 
                scope={ scope_ }
                district={ district }
                category={ category }
                subcategory={ subcategory } 
                namespace="action_plans"
                useServerLinks={ true }/>

              <ActionPlanReviewer />
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
}


function mapStateToProps({ session, actionPlan }) {
  return { session, actionPlan };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchActionPlan,
    deleteActionPlan,
    approveActionPlan
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanShow);
