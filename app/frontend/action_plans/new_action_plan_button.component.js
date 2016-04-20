import { Component } from 'react';
import { connect } from 'react-redux';

class NewActionPlanButton extends Component {
  render() {
    const { session } = this.props;

    if (session.can_create_action_plan) {
      return (
        <a href="/action_plans/new" className="new-proposal button radius expand">{I18n.t("action_plans.index.new")}</a>
      );
    }
    return null;
  }
}

function mapStateToProps({ session }) {
  return { session };
}

export default connect(mapStateToProps)(NewActionPlanButton);
