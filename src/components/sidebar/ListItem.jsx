import React from "react";
import { Link } from "react-router-dom";

function ListItem({ links, icon, title }) {
  return (
    <li className="mt-2 rounded-3xl hover:bg-p-1 transition-colors">
      <Link to={links[0]} className=" flex items-center p-3">
        <img className=" ml-2" src={icon} alt="" />
        <h2>{title}</h2>
      </Link>
    </li>
  );
}

export default ListItem;
