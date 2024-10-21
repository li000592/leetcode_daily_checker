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
import PersonInfo from "~/components/PersonInfo";

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
  const data = useLoaderData<typeof loader>();

  return (
    <main className="ui-main">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Leetcode Daily Checker</h1>
        <Link to={"/"}><p>home</p></Link>
        <PersonInfo data={data} />
      </div>
    </main>
  );
}
