import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { setOrder       }     from '../order/order.actions';

class OrderSelector extends Component {
  render() {
    const { orderLinks, order, setOrder } = this.props;

    return (
      <section className="submenu">
        { 
          orderLinks.map(orderLink => {
            return (
              <a key={orderLink} onClick={() => setOrder(orderLink)} className={order === orderLink ? `${orderLink} active` : orderLink}>
                { I18n.t(`components.order_selector.${orderLink}`) }
              </a>
            );
          })
        }
      </section>
    );
  }
}

function mapStateToProps({ order }) {
  return {
    order
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setOrder }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSelector);
