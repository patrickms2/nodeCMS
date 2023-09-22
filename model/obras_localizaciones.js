/**
 * obras_localizaciones.js
 * @description :: sequelize model of database table obras_localizaciones
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obras_localizaciones = sequelize.define('obras_localizaciones',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  obras_id:{ type:DataTypes.BIGINT },
  localizaciones_id:{ type:DataTypes.BIGINT },
  apartespacios_id:{ type:DataTypes.BIGINT },
  sort_order:{ type:DataTypes.INTEGER },
  sort_selected:{ type:DataTypes.INTEGER },
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
      async function (obras_localizaciones,options){
        obras_localizaciones.isActive = true;
        obras_localizaciones.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obras_localizaciones,options){
        if (obras_localizaciones !== undefined && obras_localizaciones.length) { 
          for (let index = 0; index < obras_localizaciones.length; index++) { 
        
            const element = obras_localizaciones[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obras_localizaciones.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obras_localizaciones);
sequelizePaginate.paginate(Obras_localizaciones);
module.exports = Obras_localizaciones;
