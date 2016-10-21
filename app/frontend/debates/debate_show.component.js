import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './debates.actions';

import Loading                  from '../application/loading.component';
import Comments                 from '../comments/comments.component';

class DebateShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { fetchDebate } = this.props;

    fetchDebate(this.props.debateId).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div style={{ position: 'relative', minHeight: '30em' }} className="debate-show component">
        <Loading show={this.state.loading} />
        {this.renderDebate()}
      </div>
    );
  }

  renderDebate() {
    const { debate } = this.props;

    if (debate.id) {
      return (
        <div className="row">
          <div className="columns large-9">
            <Comments commentable={{...debate, type: 'Debate'}} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  ({ debate }) => ({ debate }),
  actions
)(DebateShow);

DebateShow.propTypes = {
  fetchDebate: PropTypes.func.isRequired,
  debateId: PropTypes.number.isRequired,
  debate: PropTypes.object
};
