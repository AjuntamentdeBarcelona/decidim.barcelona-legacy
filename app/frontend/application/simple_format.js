import Autolinker from "autolinker";
import he from "he";

export default function simpleFormat(content){
  return Autolinker.link(he.encode(content));
}
