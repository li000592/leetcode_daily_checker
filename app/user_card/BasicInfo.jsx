import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

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

function BasicInfo() {
    const data = useLoaderData<typeof loader>();
    console.log(data);
    
  return <div>BasicInfo</div>;
}

export default BasicInfo;
