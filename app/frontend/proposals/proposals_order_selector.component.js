import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { setOrder       }     from './proposals.actions';

const ProposalsOrderSelector = ({ 
  order,
  setOrder 
}) => (
  <section className="submenu">
    <a onClick={() => setOrder("random")} className={order === 'random' ? 'active' : ''}>Aleatories</a>
    <a onClick={() => setOrder("hot_score")} className={order === 'hot_score' ? 'active' : ''}>Més actives avui</a>
    <a onClick={() => setOrder("confidence_score")} className={order === 'confidence_score' ? 'active' : ''}>Amb més suport</a>
    <a onClick={() => setOrder("created_at")} className={order === 'created_at' ? 'active' : ''}>Més noves</a>
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
