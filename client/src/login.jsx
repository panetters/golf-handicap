import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (<div>
      Login
    </div>
    )
  }
}

ReactDOM.render(<Login />, document.getElementById('app'));