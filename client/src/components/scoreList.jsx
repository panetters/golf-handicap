import React from 'react';

import ScoreListEntry from './scoreListEntry.jsx';

const ScoreList = (props) => (
  <ul>
  {props.scores.map((curScore) =>
    <ScoreListEntry key={curScore.id} course={curScore.course} net={curScore.net_score}
    gross={curScore.gross_score} date={curScore.date} />
  )}
  </ul>
)

export default ScoreList;