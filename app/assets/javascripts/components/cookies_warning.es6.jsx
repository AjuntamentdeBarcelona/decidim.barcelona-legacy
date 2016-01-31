class CookiesWarning extends React.Component {
  componentDidMount() {
    $.get(this.props.allowCookiesUrl);
  }

  render() {
    return (
      <div ref="warning" className="cookies-warning">
        {I18n.t("components.cookies_warning.text")} 
        <a onClick={() => this.close()}>{I18n.t("components.cookies_warning.close")}</a>
        <a>{I18n.t("components.cookies_warning.more_info")}</a>
      </div>
    )
  }

  close() {
    $(this.refs.warning).hide();
  }
}
