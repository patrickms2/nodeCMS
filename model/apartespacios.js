/**
 * apartespacios.js
 * @description :: sequelize model of database table apartespacios
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Apartespacios = sequelize.define('apartespacios',{
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
      async function (apartespacios,options){
        apartespacios.isActive = true;
        apartespacios.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (apartespacios,options){
        if (apartespacios !== undefined && apartespacios.length) { 
          for (let index = 0; index < apartespacios.length; index++) { 
        
            const element = apartespacios[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Apartespacios.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Apartespacios);
sequelizePaginate.paginate(Apartespacios);
module.exports = Apartespacios;
