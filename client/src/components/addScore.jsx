import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
    this.searchChange = this.searchChange.bind(this);
  }


  searchChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    return (
      <div className="course-search">
        <h4>Search for your course:</h4>
        <div className="search-field">
          <TextField fullWidth label="Course " value={this.state.query} onChange={this.searchChange} />
          <Button>Search</Button>
        </div>
      </div>
    )
  }
}

export default AddScore;