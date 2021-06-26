import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGenres } from "../redux/Actions";
import './Genres.css'

const Genres = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.gameGenres);
  const { value } = useParams();
  const generos = genres.filter((x) => x.name === value);
console.log(genres.name)


  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <h1 className= "h1">{value} Games: </h1>
      <div className="genresConteiner">
        {generos[0].games.map((x) => (
         
          <li className="li">
            <Link to={`/videogames/${x.id}`}><span className="line">{x.name}</span></Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Genres;
