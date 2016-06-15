import { PropTypes } from 'react';

const WeightControl = ({ onUpdateWeight, weight }) => (
  <span className="weight-control-component">
    <strong>{ I18n.t("components.weight_control.label")}</strong>
    <input
      className="weight"
      type="number"
      defaultValue={ weight}
      min="1"
      max="1000"
      onChange={ e => onUpdateWeight(e.target.value) }
    />
  </span>
);

WeightControl.propTypes = {
  onUpdateWeight: PropTypes.func.isRequired,
  weight: PropTypes.number
};

export default WeightControl;
