export default ({name, children}) => (
  <span>
    <i className={`icon fa fa-${name}`} />
    &nbsp;{children}
  </span>
)
