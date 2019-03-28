import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './Products.js'

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header"><h1>My React App</h1></header>
        <section>
          <Products/>
        </section>
      </div>
    );
  }
}

export default App;
