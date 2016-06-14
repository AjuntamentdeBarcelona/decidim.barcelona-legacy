import { Component, PropTypes } from 'react';
import Slider                   from 'react-slick';

export default class Carousel extends Component {
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
          infinite: true
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
      <div className="carousel">
        <Slider {...settings}>
          { this.renderItems() }
        </Slider>
      </div>
    );
  }

  renderItems(){
    return this.props.items.map((item) =>
      <div className="item-wrapper" key={item.id}>
        { this.renderItem(item) }
      </div>
    );
  }

  trim(text, length){
    if(text.length > length){
      return text.substring(0, length - 4) + "...";
    } else {
      return text;
    }
  }
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired
};
