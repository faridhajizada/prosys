import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/lessons">Lesson </Link>
          </li>
          <li>
            <Link to="/students">Student </Link>
          </li>
          <li>
            <Link to="/exams">Exam </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
