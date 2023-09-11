import "../../../index.css";

import React from "react";
import _ from "lodash";

const PROFILE = "profile";
const colors = [
  "bg-indigoProfessional",
  "bg-purpleProfessional",
  "bg-pinkProfessional",
  "bg-redProfessional",
  "bg-orangeProfessional",
  "bg-yellowProfessional",
  "bg-greenProfessional",
  "bg-cyanProfessional",
];
const Avatar = ({ initials, type }) => {
  const avatarStyle = {
    width: type === PROFILE ? "10rem" : "4rem",
    height: type === PROFILE ? "10rem" : "4rem",
    fontSize: type === PROFILE ? "3.75rem" : "1.25rem",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full text-lg font-bold uppercase text-white ${_.sample(
        colors,
      )}`}
      style={avatarStyle}
    >
      {initials}
    </div>
  );
};

export default React.memo(Avatar);
