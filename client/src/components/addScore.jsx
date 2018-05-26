import React from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

class AddScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  render() {
    return (
      <Popup>
      </Popup>
    )
  }
}

ReactDOM.render(<Login />, document.getElementById('app'));