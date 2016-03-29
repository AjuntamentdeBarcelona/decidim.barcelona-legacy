import { Component }   from 'react';

import Loading         from '../application/loading.component';
import MeetingsMap     from './meetings_map.component';
import MeetingsFilters from './meetings_filters.component';
import MeetingsList    from './meetings_list.component';

export default class Meetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  render () {
    return (
      <div className="meetings-directory">
        <MeetingsMap className="meetings-map" />

        <div className="meetings-directory-content">
          <aside className="filters sidebar" role="complementary">
            <MeetingsFilters />
          </aside>

          <div className="meetings-list-container">
            <Loading show={this.state.loading} />
            <MeetingsList />
          </div>
        </div>
      </div>
    );
  }
}
