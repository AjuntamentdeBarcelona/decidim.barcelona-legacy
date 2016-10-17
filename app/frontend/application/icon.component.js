import { PropTypes } from 'react';
import { connect }   from 'react-redux';

const Icon = ({
  name,
  removeIconClass,
  className,
  children,
  decidimIconsUrl,
  width,
  height
}) => {
  const classes = removeIconClass ? className : `icon icon--${name} ${className}`;
  
  return (
    <svg className={classes} width={width} height={height}>
      <use xlinkHref={`${decidimIconsUrl}#icon-${name}`}></use>
      {children}
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  decidimIconsUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  removeIconClass: PropTypes.boolean,
  width: PropTypes.number,
  height: PropTypes.number
};

export default connect(
  ({ decidimIconsUrl }) => ({ decidimIconsUrl }),
  null
)(Icon);
