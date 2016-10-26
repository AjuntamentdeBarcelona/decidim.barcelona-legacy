import { Component, PropTypes } from 'react';

export default class InfinitePagination extends Component {
  render() {
    return (
      <div style={{textAlign: 'right'}}>
        <button onClick={() => this.props.onVisible()} className="muted-link">
          {I18n.t('components.infinite_pagination.load_more')}
          <span aria-hidden="true">+</span>
        </button>
      </div>
    );
  }
}

InfinitePagination.propTypes = {
  onVisible: PropTypes.func.isRequired
};
