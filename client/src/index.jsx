import React from 'react';
import ReactDOM from 'react-dom';

import Scores from './components/scores.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userScores: ['test']
    }
  }

  render() {
    return (<div>
      Handycap
      <Scores scores={this.state.userScores} />
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));