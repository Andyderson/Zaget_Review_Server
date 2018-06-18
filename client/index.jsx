import React from 'react';
import Reviews from './components/Reviews.jsx';
import Description from './components/Description.jsx';

const App = () => (
    <div>
        <Description />
        <Reviews />
    </div>
);

export default App;

// <<<<<<<<<<<<<<<<<< Pre SSR >>>>>>>>>>>>>>>>>>>>>>>
// ReactDOM.render(
//   React.createElement(Reviews),
//   document.getElementById('reviews')
// );

// ReactDOM.render(
//   React.createElement(Description),
//   document.getElementById('description')
// );
