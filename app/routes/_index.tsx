import type { MetaFunction } from "@netlify/remix-runtime";
import { useState, useEffect, useRef } from "react";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "LeetCode Daily Checker" },
    { name: "description", content: "An App can check your leetcode progress every day" },
  ];
};

import type { loader } from "./api.home";
import {
  convertToTorontoTime,
  daysUntilNextWeek,
  getLastTimeOfLastWeek,
} from "~/utils";
import PersonInfo from "~/components/PersonInfo";

/**
 * @description Here we simply re-export the loader used in our resource route
 * which allows this route to fetch from the GraphQL API directly
 */
export { loader } from "./api.home";

/**
 * @description This route demonstrates fetching a list of characters from
 * a GraphQL API.
 */

export default function Index() {
  const { users } = useLoaderData<typeof loader>();
  console.log(users);

  const [weekCheckedCount, setWeekCheckedCount] = useState("N/A");
  const navigate = useNavigate();
  const userNameInput = useRef(null);
  // const recentAcSubmissionList = data.recentAcSubmissionList;
  // useEffect(() => {
  //   const endOfLastweek = getLastTimeOfLastWeek() / 1000;
  //   setWeekCheckedCount(
  //     recentAcSubmissionList.filter((row) => {
  //       return +row.timestamp - +endOfLastweek > 0;
  //     }).length
  //   );

  //   return () => {};
  // }, []);

  const handleGo = (ev) => {
    navigate(`/user/${userNameInput?.current?.value}` || "");
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Leetcode Daily Checker</h1>
      <input
        placeholder="leetcode user id"
        ref={userNameInput}
        id="username-input"
        type="text"
      ></input>
      <button onClick={handleGo}>go</button>
      <div style={{ display: "flex" }}>
        {users.map((obj) => (
          <PersonInfo data={obj} />
        ))}
      </div>
    </div>
  );
}
