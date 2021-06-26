import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="land">
      <div class="container">
        <div class="row">
            <Link to={`/videogames`}>
          <div class="action-buttons" >
            <div class="cross button" >
            </div>
          </div>
               </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
