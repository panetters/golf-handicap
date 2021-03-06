import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import ScoreListEntry from './scoreListEntry.jsx';

const ScoreList = (props) => (
  <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Course</TableCell>
          <TableCell>Gross Score</TableCell>
          <TableCell>Differential</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {props.scores.map((curScore) =>
      <ScoreListEntry key={curScore.id}  date={new Date(curScore.date)} course={curScore.name}
      gross={curScore.gross_score} diff={curScore.diff} />
    )}
    </TableBody>
  </Table>   
)

export default ScoreList;