import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Radio from '@material-ui/core/Radio';

class AddScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      courseTees: [],
      course: '',
      rating: '',
      slope: '',
      score: '',
      fetching: false,
      selected:''
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.keyCheck = this.keyCheck.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    this.selectTee = this.selectTee.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.scoreChange = this.scoreChange.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  componentDidMount() {
    document.getElementById('fetching').style.display = "none"
    document.getElementById('scoreEntry').style.display = "none"
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

  scoreChange(e) {
    this.setState({
      score: e.target.value
    })
  }

  keyCheck(e) {
    if (e.keyCode === 13) {
      this.sendRequest();
    }
  }

  selectCourse(course) {
    document.getElementById('searching').style.display = "none"
    document.getElementById('fetching').style.display = "initial"

    this.setState({
      course: course
    });

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

      document.getElementById('fetching').style.display = "none"
      document.getElementById('scoreEntry').style.display = "initial"
    });
  }

  selectTee(tee, rat, slo) {
    this.setState({
      selected: tee,
      rating: rat,
      slope: slo
    });
  }

  addScore() {
    this.props.newScore(this.state.course, this.state.score, this.state.rating, this.state.slope);
  }

  isSelected(tee) {
    return this.state.selected === tee;
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
            <TableRow  hover={true} key={course.id + '.row'} onClick={() => this.selectCourse(course.id)}>
              <TableCell key={course.id + '.name'}>{course.name}</TableCell>
              <TableCell key={course.id + '.city'}>{course.city}</TableCell>
              <TableCell key={course.id + '.state'}>{course.state}</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
        </div>

        <div id="fetching">
          <h5>Loading course tees...</h5>
        </div>

        <div id="scoreEntry">
          <h4>Select your tee:</h4>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Tee</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Slope</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.courseTees.map((tee, ind) =>
              <TableRow key={ind + '.row'} onClick={() => this.selectTee(tee.tee, tee.rating, tee.slope)}>
                <TableCell>
                    <Radio checked={tee.tee === this.state.selected} />
                </TableCell>
                <TableCell key={ind + '.tee'}>{tee.tee}</TableCell>
                <TableCell key={ind + '.rating'}>{tee.rating}</TableCell>
                <TableCell key={ind + '.slope'}>{tee.slope}</TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
          <div className="score-entry">
            <h4>Score:</h4>
            <TextField id="search" label="Score" value={this.state.score} onChange={this.scoreChange} />
            <Button onClick={this.addScore}>Submit</Button>
          </div>
        </div>

      </div>
    )
  }
}

export default AddScore;