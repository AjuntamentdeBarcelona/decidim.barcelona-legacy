import { PropTypes } from 'react';
import Please        from 'pleasejs';
import classNames    from 'classnames';

const MAX_COLORS = 26;
const COLORS = Please.make_color({
  base_color: '#c60c30',
  colors_returned: MAX_COLORS
});
const FIRST_LETTER_CHAR_CODE = 'A'.charCodeAt();

const UserAvatar = ({
  user,
  role
}) => {
  if (role && user && user.avatar_image) {
    const cssClasses = classNames(
      'left',
      {
        'admin-avatar':     role === 'administrator',
        'moderator-avatar': role === 'moderator',
        'avatar':           role === 'organization'
      }
    );

    return (
      <img src={user.avatar_image} className={cssClasses} />
    );
  } else if (user && user.name) {
    const firstLetter = user.name[0].toUpperCase();
    const style = {
      backgroundColor: COLORS[(firstLetter.charCodeAt() - FIRST_LETTER_CHAR_CODE) % MAX_COLORS],
      width: '20px',
      height: '20px',
      display: 'inline-block',
      textAlign: 'center',
      color: '#fff'
    };
    
    return (
      <span style={style} className="user-avatar left">{firstLetter}</span>
    );
  } else {
    return (
      <i className="icon-deleted user-deleted"></i>
    );
  }
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  role: PropTypes.string
};

export default UserAvatar;
