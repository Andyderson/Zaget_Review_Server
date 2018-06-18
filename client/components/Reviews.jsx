import React from 'react';
import ReactDOM from 'react-dom';
import Review from './Review.jsx';
import Description from './Description.jsx';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = { // modal styles
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(16,24,32,.95)',
    },
    content: {
      animationName: 'modalFade',
      animationDuration: '.3s',
      position: 'absolute',
      top: '50px',
      left: '20%',
      right: '40px',
      bottom: '40px',
      border: '0px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '0px',
      maxWidth: '60%',
    }
  }

// Reviews app
export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // reviewList: this.props.reviewList || [],
      reviewList: [],
      rating: '',
      modalIsOpen: false,
    };
    this.fetchReviews = this.fetchReviews.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.fetchReviews();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  fetchReviews() {
    if (typeof window !== 'undefined') {
      let id = window.location.href.split('/')[4];
      axios.get(`${BASE_URL}/api/restaurants/${id}`)
      .then(({data}) => {
        this.setState({
          reviewList: data.reviews,
          rating: data.rating,
        })
      })
      .catch((err) => {
        console.log('ERROR: ', err)
      })
    }
  }

   render() {
     let shortReviewArr = this.state.reviewList.slice(0,3); // Return first 3 reviews only
     let starsPercentage = (googleRating) => {
       let percent = googleRating / 5 * 100;
       return percent + '%';
     }

     return (
       <div>
         <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          >
          <div className='reviews-modal-container'>
            <div className="reviews-title">
              <div ref={subtitle => this.subtitle = subtitle} className="reviews-title-google">GOOGLE REVIEWS</div>
                <div className="reviews-title-stars"><span>{this.state.rating}   </span>
                  <div className="reviews-details-ratings-stars">
                   <div className="reviews-details-ratings-stars-top" style={{width: starsPercentage(this.state.rating)}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                   <div className="reviews-details-ratings-stars-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                 </div>
               </div>
            </div>
            {this.state.reviewList.map((review, index) =>
              <Review
              key={index}
              review={review}
              />
            )}
            <div className='review-container-footer'>
              <div className="reviews-modal-footer"><center>END OF RESULTS</center></div>
            </div>
          </div>
        </Modal>
         <div className="reviews-container">
           <div className="reviews-title">
             <div className="reviews-title-google">GOOGLE REVIEWS</div>
             <div className="reviews-title-stars"><span>{this.state.rating}   </span>
               <div className="reviews-details-ratings-stars">
                <div className="reviews-details-ratings-stars-top" style={{width: starsPercentage(this.state.rating)}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                <div className="reviews-details-ratings-stars-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              </div>
            </div>
           </div>
           {shortReviewArr.map((review, index) =>
             <Review
             key={index}
             review={review}
             />
           )}
         <div className='review-container-footer'>
           <button className='reviews-footer-btn' onClick={this.openModal}>MORE REVIEWS</button>
        </div>
      </div>
    </div>
    );
   }
 }
