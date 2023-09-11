import "../../../../index.css";

import Avatar from "../../Avatar/Avatar";
import React from "react";

const Comment = ({ body, user }) => {
  const { firstname, lastname } = user;
  return (
    <div className="mt-4 rounded-xl bg-grayColour dark:bg-gray-400 sm:p-5">
      <div className="flex flex-col items-center space-y-2 p-2 md:flex-row md:space-x-4 md:space-y-0">
        <Avatar
          initials={firstname[0].toUpperCase() + lastname[0].toUpperCase()}
          type="user"
          size="sm"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold md:text-left">
            {firstname + " " + lastname}
          </h4>
          <p className="text-sm font-normal md:text-left">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comment);
