class ProposalsCarousel extends Carousel {
  renderItem(proposal){
    return (
      <div className="carousel-proposal">
        <span className="proposal-title">
          { this.trim(proposal.title, 80) }
        </span>
        { (() => { if (proposal.official) {
          return (<span className="proposal-badge bcn-icon-ajuntament"></span>)
        } }()) }
        <span className="proposal-metadata">
          { (() => { if(proposal.author_name) {
            return (<span>{ this.trim(proposal.author_name, 15) } - </span>)
          }})()}
          { I18n.t('proposal_carousel.votes', { votes: proposal.votes }) }
        </span>
        <a className="see-more" href={ proposal.url }>{ I18n.t('proposal_carousel.see_more') }</a>
      </div>
    )
  }
}
