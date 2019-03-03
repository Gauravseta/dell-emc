import React, { Component } from 'react'
import  loadMovies  from '../../services';
import ReactPaginate from 'react-paginate';
import Restaurant from '../../components/Restaurant';
import arrow from '../../icon-arrow-sort.svg';
import './style.css'

class RestaurantDashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      itemsPerPage: 6,
      searchText: '',
      searchResults: [],
      sort: {
        order: 'asc'
      }
    }

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.sortFunc = this.sortFunc.bind(this);
    this.ascendingWay = this.ascendingWay.bind(this);
    this.descendingWay = this.descendingWay.bind(this);
  }

  componentWillMount() {
    loadMovies().then((success) => {
      this.setState({data: success});
    });
  }

  handlePageClick(data) {
    this.setState({currentPage: data.selected});
  }

  handleSearchChange(evt){
    let results = [];
    if (evt.target.value !== '') {
      results = this.state.data.filter((restaurant) => {
        return restaurant.Name.indexOf(evt.target.value) !== -1
      })
    }
    this.setState({searchText: evt.target.value, searchResults: results})
  }

  ascendingWay(a, b) {
    if (a.Rating > b.Rating) {
      return 1;
    }
    return -1;
  }

  descendingWay(a, b) {
    if (a.Rating < b.Rating) {
      return 1;
    }
    return -1;
  }

  sortFunc() {
    if (this.state.sort.order === 'asc') {
      this.setState({ sort: {order: 'desc'}})
    } else {
      this.setState({ sort: {order: 'asc'}})
    }
  }

  render () {
    let { data, currentPage, itemsPerPage, searchText, searchResults, sort} = this.state;
    const totalCount = data.length;
    data = sort.order === 'asc' ? data.sort(this.ascendingWay) : data.sort(this.descendingWay);
    const pageCount = Math.ceil(totalCount / itemsPerPage);
    return (
      <div>
        <h1 className="label">Europe Restaurants</h1>
        <div className="filter-section">
          <div className="search-section">
            <input type="text" placeholder="Search restaurants"
              onChange={this.handleSearchChange} value={searchText} />
              <div className="search-results-box">
              { searchResults.map((item, index) => (
                <div key={index} className="search-result">
                  {item.Name}
                </div>
              ))}
              </div>
          </div>
          <div className="sort-section">
            <span onClick={this.sortFunc}
            className={`black-name ${sort.order === 'asc' ? 'up-ver' : 'down-ver'}`}>
              RATING <img src={arrow} alt="IMG" />
            </span>
          </div>
        </div>
        <div className="restaurants">
          { data.slice(((currentPage)*itemsPerPage), ((currentPage+1)*itemsPerPage)).map((item, index) => (
              <Restaurant key={index} {...item}>
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