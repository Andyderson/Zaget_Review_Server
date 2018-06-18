import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis'

export default class Review extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     expanded: false
   };
   this.expandDescription = this.expandDescription.bind(this);
 }
 expandDescription() {
   this.setState({
     expanded: !this.state.expanded
   })
 }

 render() {
   let review = this.props.review[0]
   let reviewBody = `${review.text}`;
   let starsPercentage = (googleRating) => {
     let percent = googleRating / 5 * 100;
     return percent + '%';
   }
   let component = null
   if (!this.state.expanded) {
     component = <LinesEllipsis
       text= {reviewBody}
       maxLine='3'
       ellipsis= '... See More'
       trimRight
       basedOn='letters'
     />
   } else if (this.state.expanded) {
     component = reviewBody
   }
   return (
     <div className="review-container">
        <div className="review-profile-pic">
          <img src={review.profile_photo_url} width={70} height={70}/>
        </div>
        <div className="review-column" onClick={() => this.expandDescription()}>
          <div className="review-column-name">{review.author_name}</div>
          <div className="review-column-date">{review.relative_time_description}</div>
          <div className="reviews-details-ratings-stars">
            <div className="reviews-details-ratings-stars-top" style={{width: starsPercentage(review.rating)}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <div className="reviews-details-ratings-stars-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
         </div>
          <div className="review-column-text">
            {component}
          </div>
        </div>
    </div>
    )
  }
 }
