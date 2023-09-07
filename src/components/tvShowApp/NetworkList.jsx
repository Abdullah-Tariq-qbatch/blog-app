import React from "react";
import { Field } from "formik";

const NetworkList = ({ handleChange, availableNetworks, labelText }) => {
  const listOfNetworks = [
    "Netflix",
    "HBO",
    "Amazon",
    "Apple",
    "Fox",
    "ABC",
    "NBC",
  ];

  const getNetworks = (networks) => {
    return networks.map((network, id) => (
      <option
        className={`mb-4 w-full rounded-md ${
          availableNetworks ? "" : "bg-slate-300"
        }  p-2`}
        value={network}
        key={id}
      >
        {network}
      </option>
    ));
  };
  return (
    <Field
      name="network"
      as="select"
      className={`rounded-md  shadow-sm pr-10 pl-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none bg-[linear-gradient(45deg,transparent_50%,gray_50%),linear-gradient(135deg,gray_50%,transparent_50%),linear-gradient(to_right,#ccc,#ccc)] bg-[calc(100%_-_20px)_calc(1em_+_2px),calc(100%_-_15px)_calc(1em_+_2px),calc(100%_-_2.5em)_0.5em] bg-[5px_5px,5px_5px,1px_1.5em] bg-no-repeat appearance-none mb-2 ${
        availableNetworks
          ? "dark:bg-gray-600 dark:border-gray-700 text-gray-400 dark:focus:text-gray-200 focus:text-gray-800 border-2 border-gray-300 rounded-lg bg-gray-50 dark:focus:ring-pink-800 dark:focus:border-pink-800 focus:ring-pink-500 focus:border-pink-500"
          : "bg-slate-300 text-gray-700 w-full"
      } p-2`}
      id="network"
      {...(availableNetworks && {
        onChange: (e) => handleChange(e.target.value),
      })}
    >
      <option
        className={`mb-4 w-full rounded-md ${
          availableNetworks ? "" : "bg-slate-300"
        } p-2`}
        value=""
      >
        {labelText ? labelText : "Select Network of Tv Show"}
      </option>
      {availableNetworks
        ? getNetworks(availableNetworks)
        : getNetworks(listOfNetworks)}
    </Field>
  );
};

export default NetworkList;
