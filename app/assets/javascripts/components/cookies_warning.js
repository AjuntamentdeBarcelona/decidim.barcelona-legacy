import { Component } from 'react';

export default class CookiesWarning extends Component {
  render() {
    return (
      <div ref="warning" className="cookies-warning">
        <div className="row">
          <div className="small-12 medium-10 column">
            {I18n.t("components.cookies_warning.text")} <a className="more-information" href="/conditions"> {I18n.t("components.cookies_warning.more_info")} </a>
          </div>
          <div className="small-12 medium-2 column buttons">
            <a onClick={() => this.close()} className="close button tiny">
              {I18n.t("components.cookies_warning.close")}
            </a>
          </div>
        </div>
      </div>
    )
  }

  close() {
    $.get(this.props.allowCookiesUrl);
    $(this.refs.warning).slideUp('fast');
  }
}
