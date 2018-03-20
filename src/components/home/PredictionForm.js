import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import FormInput from '../shared/form/FormInput';

class PredictionForm extends Component {

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

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
        score = data.prediction;
      }

      this.setState({ score: score })
    });
  }

  render() {
    return (
      <div id="predForm">
        <div className="form-inputs">
          <FormInput placeholder="Pros" ref={(r) => { this.pros = r; }}/>
          <FormInput placeholder="Cons" ref={(r) => { this.cons = r; }}/>
        </div>
        <div className="form-action-button-container">
          <button className="submit-btn" onClick={this.submit}>Predict Score</button>
        </div>
        <div className="score-container">
          <span>Score:</span>
          <span>{this.state.score}</span>
        </div>
      </div>
    );
  }
}

export default PredictionForm;