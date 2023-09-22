/**
 * tipos_documentos.js
 * @description :: sequelize model of database table tipos_documentos
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Tipos_documentos = sequelize.define('tipos_documentos',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
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
      async function (tipos_documentos,options){
        tipos_documentos.isActive = true;
        tipos_documentos.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (tipos_documentos,options){
        if (tipos_documentos !== undefined && tipos_documentos.length) { 
          for (let index = 0; index < tipos_documentos.length; index++) { 
        
            const element = tipos_documentos[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Tipos_documentos.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Tipos_documentos);
sequelizePaginate.paginate(Tipos_documentos);
module.exports = Tipos_documentos;
