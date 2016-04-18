import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  fetchActionPlan
} from './action_plans.actions';

import Loading              from '../application/loading.component';
import FilterMeta           from '../filters/filter_meta.component';
import ActionPlanProposals  from './action_plan_proposals.component';

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

              <a href={edit_url} className="edit-proposal button success tiny radius right">
                <i className="icon-edit"></i>
                { I18n.t("components.action_plan_show.edit") }
              </a>

              <a href={new_revision_url} className="edit-proposal button success tiny radius right">
                <i className="icon-edit"></i>
                { I18n.t("components.action_plan_show.new_revision") }
              </a>

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

              <ActionPlanProposals actionPlan={actionPlan} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps({ session, actionPlan }) {
  return { session, actionPlan };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchActionPlan, 
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanShow);
