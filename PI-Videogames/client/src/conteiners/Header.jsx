import React from 'react';
import SearchBar from '../components/SerchBar'
import { Link } from "react-router-dom"
import './Header.css'

  const Header = () => {

    

    return (
        <div className="header">
        
          <Link to ={'/creategame'}> <p className="p">Create Game</p> </Link> <SearchBar /> 
          <Link to={`/videogames`}> <p className="p">Home</p> </Link>
        
      </div>
    );
};

export default Header;