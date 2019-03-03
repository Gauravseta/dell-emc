import React, { Component } from 'react'
import  loadMovies  from '../../services';
import ReactPaginate from 'react-paginate';
import Restaurant from '../../components/Restaurant';
import './style.css'

class RestaurantDashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      itemsPerPage: 6
    }

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    loadMovies().then((success) => {
      this.setState({data: success});
    });
  }

  handlePageClick(data) {
    this.setState({currentPage: data.selected});
  }



  render () {
    const { data, currentPage, itemsPerPage, } = this.state;
    const totalCount = data.length;
    const pageCount = Math.ceil(totalCount / itemsPerPage);
    return (
      <div>
        <h1 className="label">Europe Restaurants</h1>
        <div className="restaurants">

        { data.slice(((currentPage)*itemsPerPage), ((currentPage+1)*itemsPerPage)).map((item, index) => (
            <Restaurant className="res" key={index} {...item}>
            </Restaurant>
        ))}
        </div>

        <ReactPaginate
           pageCount={pageCount}
          onPageChange={this.handlePageClick}
          pageRangeDisplayed={5}
          activeClassName={'active'}
        />
      </div>
    )
  }
}

export default RestaurantDashboard;