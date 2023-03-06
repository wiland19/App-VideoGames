const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', {
    
    // este tipo de dato me genera un id ramdom con numeros y letra unico e irrepetible
    // id: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,
    //   primaryKey: true,
    //   unique: true,
    //   autoIncrement:true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  )
};
