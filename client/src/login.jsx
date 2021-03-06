import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.keyCheck = this.keyCheck.bind(this);
  }

  componentDidMount() {
    document.getElementById('username').focus();
  }

  sendRequest() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      if (res.data.redirect) {
        document.location.href = res.data.redirect;
      } else if (res.data = 'Error') {
        alert('Invalid Credentials');
        document.getElementById('username').focus();
      }
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

  keyCheck(e) {
    if (e.keyCode === 13) {
      this.sendRequest();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="title-login">Welcome to Handycap</h1>
        <h3 className="header header-login">Please Login</h3>
        <div className="main main-login">
          <form>
            <div>
              <TextField id="username" fullWidth label="Username" value={this.state.username} onChange={this.usernameChange} />
            </div>
            <div>
              <TextField id="password" fullWidth label="Password" value={this.state.password} onKeyDown={this.keyCheck} onChange={this.passwordChange} />
            </div>
            <div>
              <Button onClick={this.sendRequest}>Submit</Button>
            </div>
          </form>
          <a href="/register">New to Handycap? Register first.</a>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Login />, document.getElementById('app'));
