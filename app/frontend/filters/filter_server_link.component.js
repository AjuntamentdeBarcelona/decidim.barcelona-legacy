import { Component }          from 'react';

export default class FilterServerLink extends Component {
  render() {
    let namespace = this.props.namespace || 'proposals';

    return (
      <a
        href={`/${namespace}?filter=${this.props.name}=${this.props.value}`}>
        <i className={this.props.cssClass} />
        {this.props.label}
      </a>
    );
  }
}
