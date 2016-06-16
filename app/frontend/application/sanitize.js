export default function sanitize(string){
  return string.replace("<", "&lt;").replace(">", "&gt");
}
