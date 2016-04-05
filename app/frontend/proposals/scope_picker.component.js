import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { updateProposal }     from './proposals.actions';

class ScopePicker extends Component {
  render() {
    const { proposal, districts } = this.props;

    return (
      <div>
        <div className="scope-radio small-12 column">
          <label>Scope</label>
          <p className="note">Scope note</p>
          <div className="small-3 column">
            <input 
              id="proposal_scope_district"
              type="radio" 
              value="district" 
              onChange={() => this.selectScope('district')}
              checked={proposal.scope_ === 'district'}/>
            <label htmlFor="proposal_scope_district">District</label>
          </div>
          <div className="small-3 end column">
            <input 
              id="proposal_scope_city"
              type="radio" 
              value="city" 
              onChange={() => this.selectScope('city')}
              checked={proposal.scope_ === 'city'}/>
            <label htmlFor="proposal_scope_city">City</label>
          </div>
        </div>

        <div className="small-12 column">
          <select onChange={(event) => this.selectDistrict(event.target.value)}>
            {
              districts.map((district) => 
                <option key={district[1]} value={district[1]} defaultValue={proposal.district.id === district[1]}>
                  {district[0]}
                </option>
              )
            }
          </select>
        </div>
      </div>
    );
  }

  selectScope(scope) {
    const { proposal } = this.props;

    this.props.updateProposal(proposal.id, {
      scope
    });
  }

  selectDistrict(district) {
    const { proposal } = this.props;

    this.props.updateProposal(proposal.id, {
      district
    });
  }
}

function mapStateToProps({ proposal, districts }) {
  return { proposal, districts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProposal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScopePicker);
