/**
 * obras_documentos.js
 * @description :: sequelize model of database table obras_documentos
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obras_documentos = sequelize.define('obras_documentos',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
  fichero:{ type:DataTypes.STRING },
  tipo:{ type:DataTypes.BIGINT },
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
      async function (obras_documentos,options){
        obras_documentos.isActive = true;
        obras_documentos.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obras_documentos,options){
        if (obras_documentos !== undefined && obras_documentos.length) { 
          for (let index = 0; index < obras_documentos.length; index++) { 
        
            const element = obras_documentos[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obras_documentos.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obras_documentos);
sequelizePaginate.paginate(Obras_documentos);
module.exports = Obras_documentos;
