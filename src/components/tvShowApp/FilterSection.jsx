import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { groupBy, intersection, orderBy, toNumber } from "lodash";

import NetworkList from "./NetworkList";
import SearchBar from "./SearchBar";
import { calculateYear } from "../../utils/tvShowApp/utils";

const FilterSection = ({ data, pageNo }) => {
  const networkWiseShows = groupBy(data.allShows, "network");
  const availableNetworks = Object.keys(networkWiseShows);

  const countryWiseShows = groupBy(data.allShows, "country");
  const availableCountries = Object.keys(countryWiseShows);

  const [sortByYear, setSortByYear] = useState(data.isSorted);
  const [countrySelected, setCountry] = useState(data.country);
  const [networkSelected, setNetwork] = useState(data.network);

  useEffect(() => {
    handleChangeFilters({
      country: data.country,
      network: data.network,
      sorted: data.isSorted,
    });
  }, [data.country, data.network, data.isSorted]);

  const handleChangeFilters = ({ country, network, sorted }) => {
    let filteredShows = data.allShows;

    if (country) {
      filteredShows = intersection(countryWiseShows[country], filteredShows);
    }

    if (network) {
      filteredShows = intersection(networkWiseShows[network], filteredShows);
    }

    if (sorted) {
      filteredShows = orderBy(
        filteredShows,
        (show) => toNumber(calculateYear(show?.start_date)),
        "desc",
      );
    }

    setCountry(country);
    setNetwork(network);
    setSortByYear(sorted);
    data.setTvShowList(filteredShows);
  };

  const handleChangeCheckbox = (event) => {
    const isChecked = event.target.checked;
    handleChangeFilters({
      country: countrySelected,
      network: networkSelected,
      sorted: isChecked,
    });
  };

  const handleChangeCountry = (name) => {
    handleChangeFilters({
      country: name,
      network: networkSelected,
      sorted: sortByYear,
    });
  };

  const handleChangeNetwork = (name) => {
    handleChangeFilters({
      country: countrySelected,
      network: name,
      sorted: sortByYear,
    });
  };

  useEffect(() => {
    setSortByYear(false);
  }, [pageNo]);

  return (
    <div>
      <div className="flex flex-col items-center justify-between lg:flex-row lg:px-8">
        <div className="mt-4 text-center">
          <span className="text-md font-semibold text-gray-400">
            Filter options for current page
          </span>
          <Formik>
            <Form>
              <div className="mr-4 flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-4 ">
                <div className="mt-4 flex flex-row items-center justify-between">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    checked={sortByYear}
                    onChange={handleChangeCheckbox}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray-400 focus:text-gray-800 dark:focus:text-gray-200"
                  >
                    Sort By Year
                  </label>
                </div>

                <NetworkList
                  handleChange={handleChangeNetwork}
                  availableNetworks={availableNetworks}
                  labelText="Select Network"
                />
                <NetworkList
                  handleChange={handleChangeCountry}
                  availableNetworks={availableCountries}
                  labelText="Select Country"
                />
              </div>
            </Form>
          </Formik>
        </div>
        <div className="flex items-center pt-4 lg:mt-6 lg:pt-0">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
