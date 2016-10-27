import { connect }                      from 'react-redux';

import Icon                             from '../application/icon.component';

import { buildActionPlansRequestParams} from "./action_plans.actions";

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function buildUrl(props){
  let params = buildActionPlansRequestParams(props);
  return `/api/action_plans.xls?${serialize(params)}`;
}

const DownloadButton = (props) => (
  <a href={buildUrl(props)} className="action-plans-download button small right">
    <Icon name="file" />
  </a>
)

export default connect(
  ({ participatoryProcess }) => ({ participatoryProcess }),
  null
)(DownloadButton);
