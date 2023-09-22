/**
 * noticias.js
 * @description :: sequelize model of database table noticias
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Noticias = sequelize.define('noticias',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
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
      async function (noticias,options){
        noticias.isActive = true;
        noticias.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (noticias,options){
        if (noticias !== undefined && noticias.length) { 
          for (let index = 0; index < noticias.length; index++) { 
        
            const element = noticias[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Noticias.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Noticias);
sequelizePaginate.paginate(Noticias);
module.exports = Noticias;
