/**
 * comunicaciones.js
 * @description :: sequelize model of database table comunicaciones
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Comunicaciones = sequelize.define('comunicaciones',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  deleted_at:{ type:DataTypes.DATE },
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
      async function (comunicaciones,options){
        comunicaciones.isActive = true;
        comunicaciones.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (comunicaciones,options){
        if (comunicaciones !== undefined && comunicaciones.length) { 
          for (let index = 0; index < comunicaciones.length; index++) { 
        
            const element = comunicaciones[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Comunicaciones.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Comunicaciones);
sequelizePaginate.paginate(Comunicaciones);
module.exports = Comunicaciones;
