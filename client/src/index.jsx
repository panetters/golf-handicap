import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';

import ScoreList from './components/scoreList.jsx';
import AddScore from './components/addScore.jsx';
import Popup from 'reactjs-popup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      user: '',
      popup: false,
      userScores: [],
      handicap: '',
      cityQuery: '',
      courseQuery: ''
    }
    this.getUser = this.getUser.bind(this);
    this.getScores = this.getScores.bind(this);
    this.calcHandicap = this.calcHandicap.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.addScore = this.addScore.bind(this);
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
    axios.get('/userScores')
      .then((res) => {
        this.setState({
          userScores: res.data,
          fetching: false
        });
        this.calcHandicap();
      });
  }

  calcHandicap() {
    let numScores = this.state.userScores.length;
    let hc;
    let netArr = this.state.userScores.map((score) => {
      return parseFloat(score.diff);
    }).sort();

    if (netArr.length < 5) {
      hc = 'Need 5 Rounds to Calculate'
    } else if (netArr.length <= 10) {
      hc = Math.round(netArr[0] * .96 * 10) / 10;
    } else if (netArr.length <= 19) {
      let average = netArr.slice(0, 4).reduce((acc, cum) => {
        return acc + cum;
      });
      hc = Math.round(average * .96 * 10) / 10;
    } else {
      let average = netArr.slice(0, 9).reduce((acc, cum) => {
        return acc + cum;
      });
      hc = Math.round(average * .96 * 10) / 10;
    }

    this.setState({
      handicap: hc
    });
  }

  logout() {
    axios.post('/logout')
    document.location.href = '/login';
  }

  togglePopup(turnOff) {
    let val = turnOff ? false : !this.state.popup;
    this.setState({
      popup: val
    });
  }

  addScore(course, score, rating, slope) {
    let diff = (score - rating) * 113 / slope;
    diff = Math.round(diff * 10) / 10;

    this.togglePopup();

    axios.post('/addScore', {
      user: this.state.user,
      course: course,
      score: score,
      diff: diff
    }).then(() => {
      this.getScores();
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
              <Button color="primary" className="add-score" onClick={() => this.togglePopup(false)}>Add Score</Button>
              <Button className="logout" onClick={this.logout}>Logout</Button>              
            </div>
            <h1 className="title">Handycap</h1>
            <div className="scoreboard">
              <h3>Your Recent Scores:</h3>
              <ScoreList scores={this.state.userScores} />
            </div>
            <div className="handicap">
              <h3>Your Handicap:</h3>
              <p>{this.state.handicap}</p>
            </div>
            <Popup open={this.state.popup} closeOnDocumentClick onClose={() => this.togglePopup(true)}>
              <AddScore newScore={this.addScore} />
            </Popup>
          </div>
        }
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));