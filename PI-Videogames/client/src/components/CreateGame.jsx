import React, { useEffect, useState } from "react";
/* import Select from "react-select"; */
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getGenres, getPlatforms } from "../redux/Actions";
import ("./CreateGame.css")


const CreateGame = (props) => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    plataformas: [],
  });

  const [genero, setgenero] = useState({
    genero: [],
  });
  
  const handleGenres = (e) => {
     setgenero({
      genero: [...genero.genero, e.target.value],
    })
  };
  const dispatch = useDispatch();

  
  const genres = useSelector((state) => state.gameGenres);

  const platform = useSelector((state) => state.gamePlatforms);

  const handleInputChange = function (key, e) {
    setInput({
      ...input,
      [key]: e.target.value,
    });

    //     setErrors(validate({
    //           ...input,
    //           [key]: e.target.value
    //         }));
  };

  const handlePlatform = (e) => {

    setInput({
      ...input,
      plataformas: [...input.plataformas, e.target.value],
    })
   
    console.log(input.plataformas)
  };

  const handleSubmit = (e) => {
   if( typeof input.name !== "string"){ alert("ingresar nombre")}
  if(input.description === ""){ alert("ingresar descriptcion")} 
 
    e.preventDefault();
    return axios
      .post("http://localhost:3001/videogames", { ...input, ...genero })
      .then((response) => {
        alert("Juego Creado!")
        setInput({
          name: "",
          description: "",
          released: "",
          rating: 0,
          plataformas: [],
        });
        setgenero({
          genero: []
        })
        
      })
      .catch((error) => {
        error.response?.status !== 404 && alert("Algo malio sal 😅");
      });
  };

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllGames());
    dispatch(getPlatforms());
  }, [dispatch]);

  return (
    <form onSubmit={(e) => handleSubmit(e)} defaultValue={input} className="form">
      <div className= "input">
        <div >
          <label>Name:</label>
        </div>
        <input
        className="input"
          type="text"
          name="name"
          onChange={(e) => handleInputChange("name", e)}
          value={input.name}
        />
      </div>
      <div className= "input">

      <div>
        <label>Rating:</label>
      </div>

      <div>
        <input
        className="input"
          name="rating"
          type="number"
          value={input.rating}
          onChange={(e) => handleInputChange("rating", e)}
          min="0"
          max="5"
          />
      </div>
          </div>

      <div className= "input">
        <div>
          <label htmlFor="t3">Description:</label>
        </div>
        <textarea
        className="input"
          name="description"
          maxLength="140"
          rows="5"
          onChange={(e) => handleInputChange("description", e)}
          value={input.description}
          id="t3"
        ></textarea>
      </div>

      <div className= "input">
        <div>
          <label>Released:</label>
        </div>
        <input
          type="date"
          name="released"
          onChange={(e) => handleInputChange("released", e)}
          defaultValue={input.released}
        />
      </div>
      <div className="input">
        <div>
          <label>Genres:</label>
        </div>
        {genres.map((x) => (
          <label key={x.name} style={{display:'flex',flexDirection:'column'}}>
            <input
              type="checkbox"
              name="genero"
              defaultValue={x.name}
              onChange={(e) => handleGenres(e)}
              
            />
            {x.name}
          </label>
        ))}
        ;
      </div>
      <div className="input">
        <div className="plat">
          <label>Platforms:</label>
        </div>
        {platform.slice(0, 20).map((x) => (
          <label key={x.name} style={{display:'flex',flexDirection:'column'}}>
            <input
              type="checkbox"
              name="plataformas"
              defaultValue={x.name}
              onChange={(e) => handlePlatform(e)}
              
            />
            {x.name}
          </label>
        ))}
        ;
      </div>

      <input type="Submit" value="Submit" className="buttonfx"/>
    </form>
  );
};

// export function validate(input) {
//   let errors = {};
//   if (!input.Name) {
//     errors.Name = "Name is required";
//   } else if (!/\S+@\S+\.\S+/.test(input.Name)) {
//     errors.Name = "Name is invalid";
//   }
//   if (!input.Released) {
//     errors.password = "Password is required";
//   } else if (!/(?=.*[0-9])/.test(input.password)) {
//     errors.password = "Password is invalid";
//   }

//   return errors;
// }

export default CreateGame;

//formulario controlado
// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
//GEnero Srlect
//Plataformas SElect
// Boton Create
// Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas
// [ ] Botón/Opción para crear un nuevo videojuego
