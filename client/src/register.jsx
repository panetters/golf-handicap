import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Register extends React.Component {
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

  sendRequest() {
    axios.post('/register', {
      username: this.state.username,
      password: this.state.password
    });
    this.setState({
      username: '',
      password: ''
    });
  }

  usernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <TextField id="username" label="Username" value={this.state.username} onChange={this.usernameChange} />
          </div>
          <div>
            <TextField id="password" label="Password" value={this.state.password} onChange={this.passwordChange} />
          </div>
          <div>
            <Button onClick={this.sendRequest} variant="raised" color="primary">Submit</Button>
          </div>
        </form>
        <a href="/login">Have an account?</a>
      </div>
    )
  }
}

ReactDOM.render(<Register />, document.getElementById('app'));