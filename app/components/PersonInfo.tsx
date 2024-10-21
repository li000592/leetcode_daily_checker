import { useEffect, useState } from "react";
import { convertToTorontoTime, daysUntilNextWeek, getLastTimeOfLastWeek } from "~/utils";

function PersonInfo({ data }) {
  console.log(data);

  const [weekCheckedCount, setWeekCheckedCount] = useState("N/A");
  const recentAcSubmissionList = data.submissions;

  useEffect(() => {
    const endOfLastweek = getLastTimeOfLastWeek() / 1000;
    setWeekCheckedCount(
      recentAcSubmissionList.filter((row) => {
        return +row.timestamp - +endOfLastweek > 0;
      }).length
    );

    return () => {};
  }, []);
  return (
    <ul>
      <li>User: {data.username}</li>
      <li>Week Check Count: {weekCheckedCount}/10</li>
      <li>days of next week: {daysUntilNextWeek()}</li>
      <br />

      <li>Recent AC:</li>
      {recentAcSubmissionList.map((row, index) => (
        <ul key={"kk" + index}>
          <li>Question: {row.title}</li>
          <li>Date: {convertToTorontoTime(row.timestamp)}</li>
        </ul>
      ))}
    </ul>
  );
}

export default PersonInfo;
