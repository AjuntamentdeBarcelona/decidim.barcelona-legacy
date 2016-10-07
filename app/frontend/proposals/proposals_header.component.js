const ProposalsHeader = ()  => (
  <div className="row column">
    <div className="callout secondary">
      <div className="row">
        <div className="columns small-12">
          <h3 className="heading3">{ I18n.t('proposals.index.title') }</h3>
          <p>{ I18n.t('proposals.index.description') }</p>
          <p className="text-right">
            <a href="/download" className="download-pam"><span>{ I18n.t('proposals.index.download') }</span></a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ProposalsHeader;
