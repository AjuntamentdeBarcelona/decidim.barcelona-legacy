class ProposalsCarousel extends React.Component {
  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };
    return (
      <div className="proposal-carousel">
        <Slider {...settings}>
          { this.renderProposals() }
        </Slider>
      </div>
    );
  }

  renderProposals(){
    return this.props.proposals.map((proposal) => this.renderProposal(proposal));
  }

  renderProposal(proposal){
    return (
      <div className="proposal-wrapper" key={proposal.id}>
        <div>
          <span className="proposal-title">
            { this.trim(proposal.title, 80) }
          </span>
          <span className="proposal-metadata">
            { (() => { if(proposal.author_name) {
              return (<span>{ this.trim(proposal.author_name, 15) } - </span>)
            }})()}
            { I18n.t('proposal_carousel.votes', { votes: proposal.votes }) }
          </span>
          <a className="see-more" href={ proposal.url }>{ I18n.t('proposal_carousel.see_more') }</a>
        </div>
      </div>
    )
  }

  trim(text, length){
    if(text.length > length){
      return text.substring(0, length - 4) + "...";
    } else {
      return text;
    }
  }
}
