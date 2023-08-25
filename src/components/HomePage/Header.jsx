/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function Header({
  userId, user, filter, setFilter, searchTerm, handleSearchChange,
}) {
  return (
    <>
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold leading-normal text-gray-700 dark:text-gray-200 mb-2">
          Some Interesting Reads
          {' '}
          {userId ? `by ${user?.firstName} ${user?.maidenName} ${user?.lastName}` : ''}
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between w-full">
        <select id="countries" value={filter} onChange={(e) => setFilter((state) => e.target.value)} className="block md:w-60 h-11 mx-10 sm:ml-10 text-sm outline-none dark:bg-gray-600 dark:border-gray-700 text-gray-400 dark:focus:text-gray-200 focus:text-gray-800 border-2 border-gray-300 rounded-lg bg-gray-50 dark:focus:ring-pink-800 dark:focus:border-pink-800 focus:ring-pink-500 focus:border-pink-500">
          <option value="">Choose a filter</option>
          <option value="Likeness">Likeness</option>
          <option value="Popularity">Popularity</option>
        </select>

        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          id="default-search"
          className="block md:w-60 h-11 mt-3 sm:mt-0  mx-10 sm:mr-10 p-4 text-sm outline-none  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-pink-800 dark:focus:border-pink-800"
          placeholder="Search Blogs..."
          required
        />
      </div>
    </>
  );
}

export default Header;
