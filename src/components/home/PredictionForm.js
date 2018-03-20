import Ajax from '../../utils/Ajax';
import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import React from 'react';
import SpinnerBtn from '../shared/SpinnerBtn';

class PredictionForm extends Form {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state.score = null;
  }

  componentDidUpdate() {
    if (this.state.status === this.status.SERIALIZING && this.formValid()) {
      this.submit();
    }

    return true;
  }

  submit() {
    this.setState({ status: this.status.SENDING });

    const payload = {
      pros: this.state.values[0],
      cons: this.state.values[1]
    };

    Ajax.post('/api/predict', payload, (data, failed) => {
      if (failed) {
        console.warn('Request Failed');
        return;
      }

      this.submitBtn.static();

      this.setState({
        status: this.status.STATIC,
        score: data.prediction
      })
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
          <SpinnerBtn className="spinner-btn" onClick={this.submit} ref={(r) => { this.submitBtn = r; }}>Predict Score</SpinnerBtn>
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