/**
 * obras_artistas.js
 * @description :: sequelize model of database table obras_artistas
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obras_artistas = sequelize.define('obras_artistas',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  obras_id:{ type:DataTypes.BIGINT },
  artistas_id:{ type:DataTypes.BIGINT },
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
      async function (obras_artistas,options){
        obras_artistas.isActive = true;
        obras_artistas.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obras_artistas,options){
        if (obras_artistas !== undefined && obras_artistas.length) { 
          for (let index = 0; index < obras_artistas.length; index++) { 
        
            const element = obras_artistas[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obras_artistas.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obras_artistas);
sequelizePaginate.paginate(Obras_artistas);
module.exports = Obras_artistas;
