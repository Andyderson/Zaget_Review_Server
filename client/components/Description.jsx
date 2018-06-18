import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

// Description app
export default class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // title: this.props.title || '',
      // neighborhood: this.props.neighborhood || '',
      // city: this.props.city || '',
      // street: this.props.street || '',
      // price_level: this.props.price_level || 1,
      title: '',
      neighborhood: '',
      city: '',
      street: '',
      price_level: 1,
      foodScore: '4.6',
      decorScore: '4.0',
      serviceScore: '4.4',
      descriptionBody: `<b>"Inventive”</b> yet <b>“approachable”</b>, this Hayes Valley <b>“destination”</b> by Evan and Sarah Rich <b>“wows”</b> with its <b>“unique”</b>, <b>“delectable”</b> Californian dishes matched by a <b>“killer wine list”</b> and <b>“warm”</b> service in a minimalist (and <b>“loud”</b>) space adorned with salvaged barn wood; it's <b>“hard to get into”</b> (though walk-ins can sit at the bar or the communal table) and the <b>“pricey”</b>, <b>“locally sourced”</b> menu <b>“changes”</b> often, but <b>“if the stars align, you will leave sockless"</b>.`,
    };
    this.fetchReviews = this.fetchReviews.bind(this)

  }
  componentDidMount() {
    this.fetchReviews();
  }

  createMarkup() {
    return {__html: this.state.descriptionBody}; // Allow for bold text
  }

  fetchReviews() {
    if (typeof window !== 'undefined') {
      let id = window.location.href.split('/')[4]
      axios.get(`${BASE_URL}/api/restaurants/${id}`)
      .then(({data}) => {
        this.setState({
          title: data.name,
          neighborhood: data.neighborhood,
          price_level: data.price_level,
          city: data.city,
          street: data.street
        })
      })
      .catch((err) => {
        console.log('ERROR: ', err)
      })
    }
  }

  render() {
    let priceRange = [];
    for (var i = 0; i < this.state.price_level; i++) {
      priceRange.push('$');
    }
    let dollar = priceRange.map((dollar) => {
      return dollar;
    })

    return (
      <div className="reviews-container">
        <div className="description-title">{this.state.title}</div>
        <div className="description-type">{this.state.city} {this.state.street} Restaurant</div>
        <div className="description-details-container">
          <div className="description-details">{this.state.neighborhood}</div><div className='desription-details-seperator'>·</div>
          <div className="description-details">{dollar}</div>
        </div>
        <div className="logo-container">
          {/* <img src="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" className='apateez-logo'/> */}
          <div className="description-divider"/>
        </div>
        <div className="description-apateez-header">THE APATEEZ REVIEW</div>
        <div className="description-ratings-container">
          <div className="description-ratings-food">{this.state.foodScore}
            <div className="description-ratings-label">FOOD</div>
          </div>
          <div className="description-ratings-decor">{this.state.decorScore}
            <div className="description-ratings-label">DECOR</div>
          </div>
          <div className="description-ratings-service">{this.state.serviceScore}
            <div className="description-ratings-label">SERVICE</div>
          </div>
        </div>
        <div className="description-body" dangerouslySetInnerHTML={this.createMarkup()}/>
      </div>
    );
  }
}
