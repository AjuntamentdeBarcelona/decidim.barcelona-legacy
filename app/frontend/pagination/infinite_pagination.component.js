import { Component }    from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export default class InfinitePagination extends Component {
  onChange(isVisible) {
    if (isVisible) {
      this.props.onVisible();
    }
  }

  render() {
    return (
      <VisibilitySensor 
        partialVisibility={true}
        delay={200}
        onChange={(isVisible) => this.onChange(isVisible)}>
        <p className="infinite-pagination loading">{I18n.t('components.infinite_pagination.loading_more')}</p>
      </VisibilitySensor>
    );
  }
}
