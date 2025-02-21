import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-[750px] border rounded-lg py-5 shadow-lg flex flex-row justify-between items-center border-neutral-300 max-w-7xl mt-5 px-10 bg-gradient-to-r from-blue-500 to-indigo-600">
      <h1 className="text-2xl text-white font-bold">My Notes</h1>
      <ul className="flex flex-row gap-x-5">
        <li>
          <Link to={"/"} className="text-2xl text-white hover:text-pink-400 transition-colors duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to={"/add-todo"} className="text-2xl text-white hover:text-pink-400 transition-colors duration-300">
            Add To Do's
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
