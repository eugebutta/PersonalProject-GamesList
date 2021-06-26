import { GET_GAMES, GET_GAMES_DETAIL, GET_GENRES, GET_PLATFORMS } from "./ActionNames";

import axios from "axios";
const {REACT_APP_DB_KEY } = process.env;

export function getAllGames() {
  let array = [];
  return (dispatch) => {
    return axios
      .get(`https://api.rawg.io/api/games?key=778939d896364e5bb70b7a59959581bb`)
      .then((response) => {
        array = [...response.data.results];
        return axios.get(
          `https://api.rawg.io/api/games?key=778939d896364e5bb70b7a59959581bb&page=2`
        );
      })
      .then((response) => {
        
        array = [...array, ...response.data.results];
        return axios.get(
          `https://api.rawg.io/api/games?key=778939d896364e5bb70b7a59959581bb&page=3`
        );
      })
      .then((response) => {
        array = [...array, ...response.data.results];
        return axios.get(
          `https://api.rawg.io/api/games?key=778939d896364e5bb70b7a59959581bb&page=4`
        );
      })
      .then((response) => {
        
        array = [...array, ...response.data.results];
        return axios.get(
          `https://api.rawg.io/api/games?key=778939d896364e5bb70b7a59959581bb&page=5`
        );
      })
      .then((response) => {
        
        array = [...array, ...response.data.results];
        return axios.get(
          `http://localhost:3001/videogames`
        );
      })
      .then((response) => {
        console.log(response.data)
        const resp = response.data.map(x=> ({name:x.Name, genres:x.Generos[0].Name}))
        console.log(response.data.map(x=> (x.Generos[0].Name)))
        
        array = [...array, ...resp];
        dispatch({ type: GET_GAMES, payload: array });
      });
  };
}

export function getGame(id) {
  
  return (dispatch) => {
    return axios
      .get(`https://api.rawg.io/api/games/${id}${REACT_APP_DB_KEY}`)
      .then((response) => {

        dispatch({ type: GET_GAMES_DETAIL, payload: response.data });
      })
      .catch((error) => {
        if (error.response?.status !== 404) alert("Algo malio sal 😅");
        dispatch({ type: GET_GAMES_DETAIL, payload: null });
      });
  };
}



export function getGenres () {
  return (dispatch) =>{
    return axios
    .get(`https://api.rawg.io/api/genres${REACT_APP_DB_KEY}`)
    .then((response)=>{
      dispatch({type: GET_GENRES ,payload: response.data.results})
    })
  }
}


export function getPlatforms () {
  return (dispatch) =>{
    return axios
    .get(`https://api.rawg.io/api/platforms${REACT_APP_DB_KEY}`)
    .then((response)=>{
      console.log(response.data.results)
      dispatch({type: GET_PLATFORMS ,payload: response.data.results})
    })
  }
}