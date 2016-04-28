function renderOption(value, selectedValue){
  return (
    <option value={value}>{ I18n.t(`components.proposal_level_selector.level_${value}`)}</option>
  )
}

export default ({ onChangeLevel, selectedValue }) => (
  <select onChange={e => { onChangeLevel(e.target.value) }} defaultValue={selectedValue}>
    <option value={null}>{ I18n.t('components.proposal_level_selector.default' )}</option>
    { renderOption(1) }
    { renderOption(2) }
    { renderOption(3) }
  </select>
)
