/**
 * localizaciones.js
 * @description :: sequelize model of database table localizaciones
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Localizaciones = sequelize.define('localizaciones',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
  referencia:{ type:DataTypes.STRING },
  propiedad_id:{ type:DataTypes.BIGINT },
  tipo:{ type:DataTypes.STRING },
  imagen:{ type:DataTypes.STRING },
  qr:{ type:DataTypes.STRING },
  estado:{ type:DataTypes.INTEGER },
  fichero:{ type:DataTypes.STRING },
  latitude:{ type:DataTypes.STRING },
  longitude:{ type:DataTypes.STRING },
  descripcion:{ type:DataTypes.TEXT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  deleted_at:{ type:DataTypes.DATE },
  created_by:{ type:DataTypes.BIGINT },
  updated_by:{ type:DataTypes.BIGINT },
  deleted_by:{ type:DataTypes.BIGINT },
  created_by_team:{ type:DataTypes.BIGINT },
  isActive:{ type:DataTypes.BOOLEAN },
  isDeleted:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (localizaciones,options){
        localizaciones.isActive = true;
        localizaciones.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (localizaciones,options){
        if (localizaciones !== undefined && localizaciones.length) { 
          for (let index = 0; index < localizaciones.length; index++) { 
        
            const element = localizaciones[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Localizaciones.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Localizaciones);
sequelizePaginate.paginate(Localizaciones);
module.exports = Localizaciones;
