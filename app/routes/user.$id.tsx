import type { LoaderFunctionArgs } from "@remix-run/node";
import { useState, useEffect, useRef } from "react";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

import { Code } from "~/components/Code";

import type { loader } from "./api.recentAcSubmissionList";
import {
  convertToTorontoTime,
  daysUntilNextWeek,
  getLastTimeOfLastWeek,
} from "~/utils";

/**
 * @description Here we simply re-export the loader used in our resource route
 * which allows this route to fetch from the GraphQL API directly
 */
export { loader } from "./api.recentAcSubmissionList";

/**
 * @description This route demonstrates fetching a list of characters from
 * a GraphQL API.
 */


/**
 * @description This route fetches the details of a single character using
 * the Remix loader & route params.
 */
export default function User() {
  const { data, id } = useLoaderData<typeof loader>();
  const [weekCheckedCount, setWeekCheckedCount] = useState("N/A");
  const recentAcSubmissionList = data.recentAcSubmissionList;

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
    <main className="ui-main">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Leetcode Daily Checker</h1>
        <Link to={"/"}><p>home</p></Link>
        <ul>
          <li>User: {id}</li>
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

      </div>
    </main>
  );
}
