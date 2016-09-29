import { Component, PropTypes } from 'react';
import { connect }   from 'react-redux';

import * as actions  from '../order/order.actions';

class OrderSelector extends Component {
  render() {
    const { orderLinks, order, setOrder } = this.props;

    return (
      <p>
        <ul className="menu">
          { 
            orderLinks.map(orderLink => {
              return (
                <li className={order === orderLink ? `${orderLink} active` : orderLink}>
                  <a key={orderLink} onClick={() => setOrder(orderLink)} >
                    { I18n.t(`components.order_selector.${orderLink}`) }
                  </a>
                </li>
              );
            })
          }
        </ul>
      </p>
    );
  }
}

export default connect(
  ({ order }) => ({ order }),
  actions
)(OrderSelector);

OrderSelector.propTypes = {
  order: PropTypes.string.isRequired,
  orderLinks: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired
};
