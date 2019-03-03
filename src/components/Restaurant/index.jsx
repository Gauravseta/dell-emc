import React, { Component } from 'react'
import ReactStars from 'react-stars'
import './style.css'

class Restaurant extends Component {

  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { Name, City, CuisineStyle, Rating, Ranking } = this.props;
    return (
      <div className="restaurant">
        <div className="header">
          {Name}, <span>{City}</span>
          <span className="rank">
            {Ranking}
          </span>
        </div>
        <div className="body">
          <div className="cuisines">
            {CuisineStyle}
            <span className="stars">
              <ReactStars count={5} value={parseInt(Rating, 10)} edit={false} size={24} color2={'#ffd700'} />
            </span>
          </div>
        </div>
      </div>
    )
  }


}

export default Restaurant;