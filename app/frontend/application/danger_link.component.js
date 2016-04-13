import { Component } from 'react';

export default class DangerLink extends Component {
  render() {
    return (
      <a
        {...this.props}
        onClick={() => this.onClick()}>
        {this.props.children}
      </a>
    );
  }

  onClick() {
    if (confirm(I18n.t('admin.actions.confirm'))) {
      this.props.onClick();
    }
  }
}
