import { PropTypes } from 'react';

const Icon = ({name, children}) => (
  <span>
    <i className={`icon fa fa-${name}`} />
    &nbsp;{children}
  </span>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default Icon;
