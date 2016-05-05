export default ({
  author
}) => {
  const firstLetter = author.name[0].toUpperCase();
  
  return (
    <span className="author-avatar">{firstLetter}</span>
  );
}
