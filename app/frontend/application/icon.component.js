export default ({name, children}) => (
  <span>
    <i className={`fa fa-${name}`} />&nbsp;
    {children}
  </span>
)
