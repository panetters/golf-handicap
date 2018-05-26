import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseQuery: '',
      cityQuery: ''
    }
    this.courseChange = this.courseChange.bind(this);
    this.cityChange = this.cityChange.bind(this);
  }

  courseChange(e) {
    this.setState({
      course: e.target.value
    })
  }

  cityChange(e) {
    this.setState({
      course: e.target.value
    })
  }

  render() {
    return (
      <div className="course-search">
        <h4>Search by course name or city:</h4>
        <div>
          <TextField fullWidth label="Course " value={this.state.courseQuery} onChange={this.courseChange} />
          <Button>Course Search</Button>
        </div>
        <div>
          <TextField fullWidth label="City" value={this.state.cityQuery} onChange={this.cityChange} />
          <Button>City Search</Button>
        </div>
      </div>
    )
  }
}

export default AddScore;