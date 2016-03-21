import Carousel from '../application/carousel.component';

export default class ProposalsCarousel extends Carousel {
  renderItem(proposal){
    return (
      <div className="carousel-proposal">
        <span className="proposal-title">
          { this.trim(proposal.title, 80) }
        </span>
        {this.renderOfficialBadge(proposal)}
        <span className="proposal-metadata">
          { (() => { if(proposal.author_name) {
            return (<span>{ this.trim(proposal.author_name, 15) } - </span>)
          }})()}
          { I18n.t('components.proposal_carousel.votes', { votes: proposal.total_votes }) }
        </span>
        <a className="see-more" href={ proposal.url }>{ I18n.t('components.proposal_carousel.see_more') }</a>
      </div>
    )
  }

  renderOfficialBadge(proposal) {
    if (proposal.official) {
      return (<span className="proposal-badge bcn-icon-ajuntament"></span>)
    }
    return null;
  }
}
