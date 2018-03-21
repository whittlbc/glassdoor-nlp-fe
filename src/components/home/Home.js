import React, { Component } from 'react';
import Header from '../shared/Header';
import PredictionForm from './PredictionForm';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Header/>
        <section id="homeBody">
          <PredictionForm/>
        </section>
      </div>
    );
  }
}

export default Home;