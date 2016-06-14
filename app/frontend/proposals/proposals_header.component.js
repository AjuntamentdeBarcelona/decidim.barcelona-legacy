const ProposalsHeader = ()  => (
  <div className="page-title">
    <div className="wrap row proposals-header">
      <div className="small-12 columns">
        <h2>{ I18n.t('proposals.index.title') }</h2>
      </div>
    </div>
    <div className="wrap row proposals-header">
      <div className="small-12 medium-7 large-9 columns">
        <h3>{ I18n.t('proposals.index.description') }</h3>
      </div>
      <div className="small-12 medium-5 large-3 columns">
        <div className="download-buttons">
          <a href="/download" className="download-pam"><span>{ I18n.t('proposals.index.download') }</span></a>
        </div>
      </div>
    </div>
  </div>
);

export default ProposalsHeader;
