/**
 * secciones_web.js
 * @description :: sequelize model of database table secciones_web
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Secciones_web = sequelize.define('secciones_web',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  titulo:{ type:DataTypes.STRING },
  contenido:{ type:DataTypes.TEXT },
  imagen:{ type:DataTypes.STRING },
  idioma:{ type:DataTypes.STRING },
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
      async function (secciones_web,options){
        secciones_web.isActive = true;
        secciones_web.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (secciones_web,options){
        if (secciones_web !== undefined && secciones_web.length) { 
          for (let index = 0; index < secciones_web.length; index++) { 
        
            const element = secciones_web[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Secciones_web.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Secciones_web);
sequelizePaginate.paginate(Secciones_web);
module.exports = Secciones_web;
