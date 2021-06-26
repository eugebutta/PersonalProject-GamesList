const { text } = require('body-parser');
const { DataTypes } = require('sequelize');



// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripción: {
      type: DataTypes.TEXT,
    allowNull:true,
    },
    Rating: {
      type: DataTypes.INTEGER,
    },
    Released: {
      type: DataTypes.DATEONLY,
    }, 
    Plataform: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    }, 
   
  });

  
   sequelize.define('Genero', {
    Name: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
 
  
};
