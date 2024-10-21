/**
 * @name fetchFromGraphQL
 * @external https://css-tricks.com/raw-graphql-querying
 * @description This function is used to fetch data from the GraphQL API.
 * Check out the link above for more information.
 */
const GRAPHQL_API = "https://leetcode.com/graphql/";
export const fetchFromGraphQL = async (
  query: string,
  variables?: Record<string, any>
) => {
  if (!GRAPHQL_API) {
    throw new Error("GRAPHQL_API is required");
  }

  const body: any = { query };

  if (variables) body.variables = variables;

  return fetch(GRAPHQL_API, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
};

export const gql = String.raw;

export function convertToTorontoTime(unixTimestamp: any) {
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

export function getLastTimeOfLastWeek() {
  // Get the current date
  const now = new Date();

  // Calculate the last Sunday (previous week)
  const lastSunday = new Date(now);
  lastSunday.setDate(now.getDate() - now.getDay() - 7); // Go back to the last Sunday

  // Set the time to the last moment of that day
  lastSunday.setHours(23, 59, 59, 999);

  return lastSunday;
}

export function daysUntilNextWeek() {
  const now = new Date();
  const currentDay = now.getDay(); // Get current day of the week (0 = Sunday, 6 = Saturday)

  // Calculate days until next Sunday (next week)
  const daysLeft = 7 - currentDay;

  return daysLeft;
}
