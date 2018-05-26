import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';

import ScoreList from './components/scoreList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      user: '',
      userScores: [],
      cityQuery: '',
      courseQuery: ''
    }
    this.getUser = this.getUser.bind(this);
    this.getScores = this.getScores.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getScores();
  }

  getUser() {
    axios.get('/user')
      .then((user) => {
        this.setState({
          user: user.data
        })
      })
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
            <div className="topbar">
              Welcome {this.state.user}
              <Button variant="outlined" className="logout">Logout</Button>
            </div>
            <h1 className="title">Handycap</h1>
            <div className="scoreboard">
              <h3>Your Recent Scores:</h3>
              <ScoreList scores={this.state.userScores} />
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));