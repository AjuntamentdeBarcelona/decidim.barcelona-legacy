import { Component } from 'react';

export default class DangerLink extends Component {
  render() {
    return (
      <a
        {...this.props}
        onClick={(event) => this.onClick(event)}>
        {this.props.children}
      </a>
    );
  }

  onClick(event) {
    if (confirm(I18n.t('admin.actions.confirm'))) {
      this.props.onClick();
    } else {
      event.preventDefault();
    }
  }
}
