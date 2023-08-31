import axios from "axios";

const SlackNotification = async (error) => {
  // eslint-disable-next-line no-undef
  const slackAPI = process.env.REACT_APP_SLACK_URL;
  const config = {
    method: "post",
    url: slackAPI,
    headers: {
      "Content-Type": "text/plain",
    },
    data: error,
  };
  axios.request(config);
};

export default SlackNotification;
