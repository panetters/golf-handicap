import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ScoreList from './components/scoreList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      userScores: [],
      cityQuery: '',
      courseQuery: ''
    }
    this.getScores = this.getScores.bind(this);
  }

  componentDidMount() {
    this.getScores();
  }

  getScores() {
    axios.get('/userscores')
      .then((res) => {
        this.setState({
          userScores: res.data,
          fetching: false
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        { this.state.fetching ?
          <div className="loading">
            <h1>Fetching your profile...</h1>
            <img src="./spinner.gif" height="70" width="70" />
          </div>
        : <div>
            <h1>Handycap</h1>
            <ScoreList scores={this.state.userScores} />
          </div>
        }
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));