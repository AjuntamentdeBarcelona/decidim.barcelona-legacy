import { Component } from 'react';
import { connect }   from 'react-redux';

import * as actions  from '../order/order.actions';

class CommentsOrderSelector extends Component {
  componentDidMount() {
    const { setOrder } = this.props;
    setOrder('most_voted');
  }

  render() {
    const { order, setOrder } = this.props;

    return (
      <div className="small-12 medium-4 columns">
        <form>
          <div className="small-12 medium-4 left">
            <label forHtml="order-selector-participation">
              {I18n.t("comments.select_order")}
            </label>
          </div>
          <div className="small-12 medium-8 left">
            <select id="comments-order-selector" value={order} onChange={e => setOrder(e.target.value)}>
              <option value="most_voted">{I18n.t("comments.orders.most_voted")}</option>
              <option value="newest">{I18n.t("comments.orders.newest")}</option>
              <option value="oldest">{I18n.t("comments.orders.oldest")}</option>
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  ({ order }) => ({ order }),
  actions
)(CommentsOrderSelector);
