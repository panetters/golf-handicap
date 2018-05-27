import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class AddScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      courseTees: [],
      fetching: false
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.keyCheck = this.keyCheck.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
  }

  componentDidMount() {
    document.getElementById('fetching').style.visibility = "hidden"
    document.getElementById('search').focus();
  }

  sendRequest() {
    axios.post('/search', {
      query: this.state.query
    }).then((res) => {
      this.setState({
        results: res.data.rows
      });
    });

    this.setState({
      query: ''
    });
  }

  searchChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  keyCheck(e) {
    if (e.keyCode === 13) {
      this.sendRequest();
    }
  }

  selectCourse(course) {
    document.getElementById('searching').style.visibility = "hidden"
    document.getElementById('fetching').style.visibility = "visible"

    axios.get('/courseInfo/' + course, {
      courseId: course
    }).then((res) => {
      let courseTees = [];
      for (let tees in res.data) {
        courseTees.push({
          tee: tees,
          rating: res.data[tees].Full.rating,
          slope: res.data[tees].Full.slope
        })
      }
      this.setState({
        courseTees: courseTees
      });
    });
  }

  render() {
    return (
      <div className="course-search">

        <div id="searching">
          <h4>Search for your course:</h4>
          <div className="search-field">
            <TextField id="search" fullWidth label="Course" value={this.state.query} onKeyDown={this.keyCheck} onChange={this.searchChange} />
            <Button onClick={this.sendRequest}>Search</Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.results.map((course) =>
            <TableRow key={course.id + '.row'} onClick={() => this.selectCourse(course.id)}>
              <TableCell key={course.id + '.name'}>{course.name}</TableCell>
              <TableCell key={course.id + '.city'}>{course.city}</TableCell>
              <TableCell key={course.id + '.state'}>{course.state}</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
        </div>

        <div id="fetching">
          Test
        </div>

      </div>
    )
  }
}

export default AddScore;