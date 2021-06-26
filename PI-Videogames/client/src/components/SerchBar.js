import React, { useState } from "react";
import { getGame } from "../redux/Actions";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SerchBar.css";


const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
console.log(keyword)
  const handleChange = async (e) => {
    setKeyword(e.target.value);

  };
  const reset = () => {
    setKeyword ("")
  }

  const handleSubmit = async(e)=> {
    console.log(keyword)
    e.preventDefault();
     dispatch(getGame(keyword)); 
     history.push(`/videogames/${keyword}`);  
     reset()
  };


return (

    
    <div className="general">
     
      <form  class="search-bar" onSubmit={(e) => handleSubmit(e)}>
        <input 
        type="text" 
        name="" 
        value={keyword}
        autoComplete="off"
        id= "keyword"
        onChange={(e) => handleChange(e)}
        placeholder={"Search Game"}
        required />
        <button 
        class="search-btn"
        type="submit" 
        >
        </button>
      </form>
      {/* <ul>
         {this.props.movies?.map ((movie)=> 
            <li key={movie.imdbID}>
           <Link to= {`/movie/${movie.imdbID}`}>
             {movie.Title}
           </Link>
          < button onClick = {()=> {
            this.props.addMovieFavorite({title: movie.Title, id: movie.imdbID})
          }}>FAV</button>
           </li>)}
        </ul> */}
    </div>
  );
};

export default SearchBar;
