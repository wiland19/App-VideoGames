const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
    // este tipo de datos me genera un id ramdom con numeros y letra unico e irrepetible
    id: {
      // type: DataTypes.INTEGER,
      // autoIncrement: true,
      // allowNull: false,
      // primaryKey: true,
      // unique:true,

       type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull:false,
    },
    rating: {
      type: DataTypes.DECIMAL(10,2),
      allowNull:false,
    },
     // a traves de esta propiedad podemos acceder de forma mas facil a los pokemons en la bD
     createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    
  },
  )
};
