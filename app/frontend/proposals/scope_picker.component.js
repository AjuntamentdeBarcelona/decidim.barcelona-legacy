import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { updateProposal }     from './proposals.actions';

class ScopePicker extends Component {
  render() {
    const { proposal } = this.props;

    return (
      <div>
        <div className="scope-radio small-12 column">
          <label>{I18n.t('proposals.form.proposal_scope')}</label>
          <p className="note">{I18n.t('proposals.form.proposal_scope_note')}</p>
          <div className="small-3 column">
            <input 
              id="proposal_scope_district"
              type="radio" 
              value="district" 
              onChange={() => this.selectScope('district')}
              checked={proposal.scope_ === 'district'}/>
            <label htmlFor="proposal_scope_district">{I18n.t('proposals.form.proposal_scope_district')}</label>
          </div>
          <div className="small-3 end column">
            <input 
              id="proposal_scope_city"
              type="radio" 
              value="city" 
              onChange={() => this.selectScope('city')}
              checked={proposal.scope_ === 'city'}/>
            <label htmlFor="proposal_scope_city">{I18n.t('proposals.form.proposal_scope_city')}</label>
          </div>
        </div>

        {this.renderDistrictPicker()}
      </div>
    );
  }

  renderDistrictPicker() {
    const { proposal, districts } = this.props;

    if (proposal.scope_ === 'district') {
      return (
        <div className="small-12 column">
          <select onChange={(event) => this.selectDistrict(event.target.value)} value={proposal.district && String(proposal.district.id)}>
            {
              districts.map((district) => 
                <option key={district[1]} value={district[1]}>
                  {district[0]}
                </option>
              )
            }
          </select>
        </div>
      );
    }
    return null;
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
