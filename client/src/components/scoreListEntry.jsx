import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const ScoreListEntry = (props) => (
  <TableRow>
    <TableCell>{props.date.toDateString()}</TableCell>
    <TableCell>{props.course}</TableCell>
    <TableCell>{props.gross}</TableCell>
    <TableCell>{props.diff}</TableCell>
  </TableRow>
)

export default ScoreListEntry;