import Please from 'pleasejs';

const MAX_COLORS = 26;
const COLORS = Please.make_color({
  colors_returned: MAX_COLORS
});
const FIRST_LETTER_CHAR_CODE = 'A'.charCodeAt();

export default ({
  author
}) => {
  if (author.name) {
    const firstLetter = author.name[0].toUpperCase();
    const style = {
      backgroundColor: COLORS[(firstLetter.charCodeAt() - FIRST_LETTER_CHAR_CODE) % MAX_COLORS]
    };
    
    return (
      <span style={style} className="author-avatar left">{firstLetter}</span>
    );
  } else {
    return (
      <i className="icon-deleted user-deleted"></i>
    );
  }
}
