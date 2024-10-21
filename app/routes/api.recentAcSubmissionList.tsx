import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { fetchFromGraphQL, gql } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id = "li000592" } = params;

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

  const variables = {
    username: id, // Replace with dynamic or desired username
    limit: 15,
  };

  const res = await fetchFromGraphQL(getrecentAcSubmissionListQuery, variables);
  const result = await res.json();
  return json({ username: id, submissions: result.data.recentAcSubmissionList });
};
