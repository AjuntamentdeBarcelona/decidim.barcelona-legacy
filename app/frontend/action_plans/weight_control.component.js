export default ({ onUpdateWeight, weight }) => (
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
)
