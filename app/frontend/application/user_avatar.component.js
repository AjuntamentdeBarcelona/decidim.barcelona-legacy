import Please     from 'pleasejs';
import classNames from 'classnames';

const MAX_COLORS = 26;
const COLORS = Please.make_color({
  colors_returned: MAX_COLORS
});
const FIRST_LETTER_CHAR_CODE = 'A'.charCodeAt();

export default ({
  user,
  as
}) => {
  if (user.avatar_image) {
    const role = as || user.role;
    const cssClasses = classNames(
      'left',
      {
        'admin-avatar':     role === 'administrator',
        'moderator-avatar': role === 'moderator',
        'avatar':           role === 'organization'
      }
    );

    return (
      <img src={user.avatar_image} width="32" height="32" className="admin-avatar left" />
    );
  } else if (user.name) {
    const firstLetter = user.name[0].toUpperCase();
    const style = {
      backgroundColor: COLORS[(firstLetter.charCodeAt() - FIRST_LETTER_CHAR_CODE) % MAX_COLORS]
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
