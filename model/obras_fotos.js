/**
 * obras_fotos.js
 * @description :: sequelize model of database table obras_fotos
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obras_fotos = sequelize.define('obras_fotos',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
  foto:{ type:DataTypes.STRING },
  obras_id:{ type:DataTypes.BIGINT },
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
      async function (obras_fotos,options){
        obras_fotos.isActive = true;
        obras_fotos.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obras_fotos,options){
        if (obras_fotos !== undefined && obras_fotos.length) { 
          for (let index = 0; index < obras_fotos.length; index++) { 
        
            const element = obras_fotos[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obras_fotos.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obras_fotos);
sequelizePaginate.paginate(Obras_fotos);
module.exports = Obras_fotos;
