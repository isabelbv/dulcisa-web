import { connect } from "@tidbcloud/serverless";

export const db = connect({
  url: import.meta.env.VITE_DATABASE_URL,
});
