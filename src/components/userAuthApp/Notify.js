import { ToastContainer, toast } from "react-toastify";

import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Notify() {
  const success = useSelector((state) => state.Users.success);
  const error = useSelector((state) => state.Users.error);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <ToastContainer
      theme="colored"
      position="bottom-right"
      newestOnTop={true}
    />
  );
}

export default Notify;
