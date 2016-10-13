import { PropTypes } from 'react';
import { connect }   from 'react-redux';

const Icon = ({name, className, children, decidimIconsUrl}) => (
  <svg className={`icon icon--${name} ${className}`}>
    <use xlinkHref={`${decidimIconsUrl}#icon-${name}`}></use>
    {children}
  </svg>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  decidimIconsUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any
};

export default connect(
  ({ decidimIconsUrl }) => ({ decidimIconsUrl }),
  null
)(Icon);
