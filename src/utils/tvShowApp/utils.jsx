import Axios from "axios";
export const calculateYear = (givenDate) => {
  if (givenDate?.split("-").length > 1) return givenDate?.split("-")[0];
  else if (givenDate?.split("-").length === 1)
    return givenDate?.split("/")?.[2];
  return givenDate;
};

export const slackNotification = (data) => {
  // eslint-disable-next-line no-undef
  const slackUrl = process.env.REACT_APP_SLACK_URL;
  const config = {
    method: "post",
    url: slackUrl,
    headers: {
      "Content-Type": "text/plain",
    },
    data: data,
  };
  Axios.request(config);
};
