import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { setOrder       }     from '../order/order.actions';

const ProposalsOrderSelector = ({ 
  order,
  setOrder 
}) => (
  <section className="submenu">
    <a onClick={() => setOrder("random")} className={order === 'random' ? 'random active' : 'random'}>
      { I18n.t('proposals.index.orders.random') }
    </a>
    <a onClick={() => setOrder("hot_score")} className={order === 'hot_score' ? 'hot_score active' : 'hot_score'}>
      { I18n.t('proposals.index.orders.hot_score') }
    </a>
    <a onClick={() => setOrder("confidence_score")} className={order === 'confidence_score' ? 'confidence_score active' : 'confidence_score'}>
      { I18n.t('proposals.index.orders.confidence_score') }
    </a>
    <a onClick={() => setOrder("created_at")} className={order === 'created_at' ? 'created_at active' : 'created_at'}>
      { I18n.t('proposals.index.orders.created_at') }
    </a>
  </section>
);

function mapStateToProps({ order }) {
  return {
    order
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalsOrderSelector);
