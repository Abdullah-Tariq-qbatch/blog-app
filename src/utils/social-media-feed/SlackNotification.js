import axios from "axios";

const SlackNotification = async (error) => {
  const config = {
    method: "post",
    url: "https://hooks.slack.com/services/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",
    headers: {
      "Content-Type": "text/plain",
    },
    data: error,
  };
  axios.request(config);
};

export default SlackNotification;
