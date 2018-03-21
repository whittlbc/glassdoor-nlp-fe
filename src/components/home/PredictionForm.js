import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import FormInput from '../shared/form/FormInput';
import SpinnerBtn from "../shared/SpinnerBtn";

class PredictionForm extends Component {

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.getScoreContainer = this.getScoreContainer.bind(this);

    this.state = {
      score: null
    };
  }

  submit() {
    const payload = {
      pros: this.pros.serialize(),
      cons: this.cons.serialize()
    };

    Ajax.post('/api/predict', payload, (data, failed) => {
      var score;

      if (failed) {
        console.error('Request Failed');
        score = null;
      } else {
        score = Math.round( parseFloat(data.prediction) * 10) / 10;
      }

      this.submitBtn.static();
      this.setState({ score: score })
    });
  }

  getScoreContainer() {
    if (this.state.score === null) {
      return;
    }

    return (
      <div className="score-container">
        <div className="score-val">{this.state.score.toFixed(1)}</div>
        <div className="score-text">Score</div>
      </div>
    );
  }

  render() {
    return (
      <div id="predForm" className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center">
            <h3 className="home-title text-white">Glassdoor NLP</h3>
            <p className="pt-4 home-sub-title text-white mx-auto">Using NLP to predict company review scores from Glassdoor</p>
          </div>
        </div>
        <div className="form-container">
          <div className="form-inputs">
            <FormInput placeholder="Company Pros" ref={(r) => { this.pros = r; }} useTextarea={true}/>
            <FormInput placeholder="Company Cons" ref={(r) => { this.cons = r; }} useTextarea={true}/>
          </div>
          <div className="form-action-button-container">
            <SpinnerBtn className="submit-btn" onClick={this.submit} ref={(r) => { this.submitBtn = r; }}>Predict Score</SpinnerBtn>
          </div>
          {this.getScoreContainer()}
        </div>
      </div>
    );
  }
}

export default PredictionForm;