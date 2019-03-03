import React, { Component } from 'react';
import RestaurantDashboard from './pages/RestaurantDashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RestaurantDashboard></RestaurantDashboard>
        </header>
      </div>
    );
  }
}

export default App;
