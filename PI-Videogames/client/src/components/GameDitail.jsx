import React, { useState } from "react";
import { getGame } from "../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GameDitail.css";

const GameDitail = () => {
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.gameDetail);
const [state, setstate] = useState(null)
  console.log(gameDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getGame(id));
  }, [dispatch]);

  return (
    <div className="conteiner">
      {gameDetail ? (
        <div className="card">
          <div key={gameDetail.id}>
            <h1 className="card_title">{gameDetail.name}</h1>
            <img
            className="img"
              src={gameDetail.background_image}
              alt="img"
              
            />
            <h2>
              <div className="platform">
               <div>Platforms:</div> 
                {gameDetail.parent_platforms?.map((x) => (
                  <p key={x.id}> {x.platform.name}</p>
                ))}{" "}
              </div>
            </h2>
            <h1>Rating: {gameDetail.rating}</h1>
            <h1>Realsed:{gameDetail.released}</h1>
          </div>
        </div>
      ) : (
        <h1>Juego no encontrado</h1>
      )}
    </div>
  );
};

export default GameDitail;
