import type { MetaFunction } from "@netlify/remix-runtime";
import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
              id
              title
              titleSlug
              timestamp
            }
          }
        `,
        variables: {
          username: "li000592", // Replace with the desired username
          limit: 15,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const submissions = data.data.recentAcSubmissionList;

    return json(submissions); // Return the submissions in JSON format
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    // Return an error response if fetching fails
    return json({ error: "Failed to fetch data" }, { status: 500 });
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [weekCheckedCount, setWeekCheckedCount] = useState(0);
  useEffect(() => {
    const endOfLastweek = getLastTimeOfLastWeek();
    setWeekCheckedCount(
      data.filter((row) => {
        row.timestamp - endOfLastweek;
      }).length
    );

    return () => {};
  }, []);

  console.log(data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Leetcode Daily Checker</h1>

      <ul>
        <li>User: Haorong</li>
        <li>Week Check Count: {weekCheckedCount}/7</li>
        <br />

        <li>History:</li>
        {data.map((row, index) => (
          <ul key={"kk" + index}>
            <li>Question: {row.title}</li>
            <li>Date: {convertToTorontoTime(row.timestamp)}</li>
          </ul>
        ))}
      </ul>
    </div>
  );
}

function convertToTorontoTime(unixTimestamp: any) {
  // Convert the Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Format the date for Toronto time
  const options = {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour time format
  };

  // Convert to localized string
  return date.toLocaleString("en-US", options);
}

// Example usage
const unixTimestamp = 1624569771;
const torontoTime = convertToTorontoTime(unixTimestamp);
console.log(torontoTime);

function getLastTimeOfLastWeek() {
  // Get the current date
  const now = new Date();

  // Calculate the last Sunday (previous week)
  const lastSunday = new Date(now);
  lastSunday.setDate(now.getDate() - now.getDay() - 7); // Go back to the last Sunday

  // Set the time to the last moment of that day
  lastSunday.setHours(23, 59, 59, 999);

  return lastSunday;
}
