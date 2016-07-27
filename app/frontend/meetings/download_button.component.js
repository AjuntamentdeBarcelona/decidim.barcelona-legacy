import { buildMeetingsRequestParams } from "./meetings.actions";

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function buildUrl(props){
  let params = buildMeetingsRequestParams(props);
  return `/api/meetings.csv?${serialize(params)}`;
}

const DownloadButton = (props) => (
    <a href={buildUrl(props)} className="proposals-download button small right">
    <i className={`icon fa fa-download`}></i>
    </a>
)

export default DownloadButton;
