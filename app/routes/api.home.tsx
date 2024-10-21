import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { fetchFromGraphQL, gql } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const list = ["li000592", "djm04298"];
  const getrecentAcSubmissionListQuery = gql`
    query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  // Use Promise.all to handle multiple asynchronous operations
  const responses = await Promise.all(
    list.map(async (id) => {
      const variables = {
        username: id,
        limit: 15,
      };

      const res = await fetchFromGraphQL(getrecentAcSubmissionListQuery, variables);
      const result = await res.json();

      // Structure the result to include the username
      return { username: id, submissions: result.data.recentAcSubmissionList };
    })
  );

  // Return all responses as JSON
  return json({ users: responses });
};
