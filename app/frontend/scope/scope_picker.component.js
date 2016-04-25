import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

class ScopePicker extends Component {
  render() {
    const namespace = this.props.namespace || 'proposal';
    const { scope } = this.props;

    return (
      <div>
        <div className="scope-radio small-12 column">
          <label>{I18n.t('proposals.form.proposal_scope')}</label>
          <p className="note">{I18n.t('proposals.form.proposal_scope_note')}</p>
          <div className="small-3 column">
            <input 
              id={`${namespace}_scope_district`}
              type="radio" 
              value="district" 
              onChange={() => this.selectScope('district')}
              checked={scope === 'district'}/>
            <label htmlFor={`${namespace}_scope_district`}>{I18n.t('proposals.form.proposal_scope_district')}</label>
          </div>
          <div className="small-3 end column">
            <input 
              id={`${namespace}_scope_city`}
              type="radio" 
              value="city" 
              onChange={() => this.selectScope('city')}
              checked={scope === 'city'}/>
            <label htmlFor={`${namespace}_scope_city`}>{I18n.t('proposals.form.proposal_scope_city')}</label>
          </div>
        </div>

        {this.renderDistrictPicker()}
      </div>
    );
  }

  renderDistrictPicker() {
    const namespace = this.props.namespace || 'proposal';
    const { scope, district, districts } = this.props;

    if (scope === 'district') {
      return (
        <div className="small-12 column">
          <select 
            id={`${namespace}_district`}
            onChange={(event) => this.selectDistrict(event.target.value)} 
            value={district && String(district.id)}>
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
    this.props.onScopeSelected(scope);
  }

  selectDistrict(districtId) {
    this.props.onDistrictSelected(districtId);
  }
}

function mapStateToProps({ districts }) {
  return { districts };
}

export default connect(mapStateToProps)(ScopePicker);
