/* eslint-disable no-undef */
import axios from "axios";

const slackHookURL = process.env.REACT_APP_SLACK_URL;
export default async (error) => {
  await axios.post(
    slackHookURL,
    { text: `Error ${error.name}.\n${error.message}` },
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
};
