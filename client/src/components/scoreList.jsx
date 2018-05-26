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
          <TableCell>Net Score</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {props.scores.map((curScore) =>
      <ScoreListEntry key={curScore.id}  date={new Date(curScore.date)} course={curScore.course}
      gross={curScore.gross_score} net={curScore.net_score} />
    )}
    </TableBody>
  </Table>   
)

export default ScoreList;