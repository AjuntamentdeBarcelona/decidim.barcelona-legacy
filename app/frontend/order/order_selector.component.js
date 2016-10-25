import { Component, PropTypes } from 'react';
import { connect }   from 'react-redux';

import * as actions  from '../order/order.actions';

class OrderSelector extends Component {
  componentDidMount() {
    $('.dropdown').foundation();
  }

  render() {
    const { orderLinks, order, setOrder } = this.props;

    return (
      <div className="row collapse order-by">
        <div className="order-by__dropdown">
          <span className="order-by__text">{ I18n.t('components.order_selector.title') }:</span>
          <ul className="dropdown menu" data-dropdown-menu="">
            <li>
              <a>{ I18n.t(`components.order_selector.${order}`) }</a>
              <ul className="menu">
                {
                  orderLinks.map(orderLink => {
                    return (
                      <li key={orderLink}>
                        <a onClick={() => setOrder(orderLink)}>
                          { I18n.t(`components.order_selector.${orderLink}`) }
                        </a>
                      </li>
                    );
                  })
                }
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );``
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
