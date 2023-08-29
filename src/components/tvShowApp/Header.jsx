import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import movie_logo from "../../assets/tvShowApp/movie_logo.png";

const Header = () => {
  const navButtonStyle =
    "inline-flex items-center py-2 pl-3 pr-4  text-l font-medium text-center text-white hover:border hover:border-white rounded-lg hover:text-white hover:bg-gray-600 focus:ring-1 focus:outline-none focus:ring-gray-600";
  return (
    <>
      <nav className=" border-gray-200 bg-gray-800 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/tvShows" className="flex items-center">
            <img src={movie_logo} className="h-8 mr-3" alt="Cinema-site logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              CINEMA-VERSE
            </span>
          </NavLink>
          <SearchBar />

          <div
            className="items-center bg-gray-800 space-x-3 w-screen md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <NavLink to="/tvShows" className={navButtonStyle}>
              Home
            </NavLink>

            <NavLink to="/tvShows/add-tv-show" className={navButtonStyle}>
              Add TV Show
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
