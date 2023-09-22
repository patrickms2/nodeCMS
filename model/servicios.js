/**
 * servicios.js
 * @description :: sequelize model of database table servicios
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Servicios = sequelize.define('servicios',{
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
      async function (servicios,options){
        servicios.isActive = true;
        servicios.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (servicios,options){
        if (servicios !== undefined && servicios.length) { 
          for (let index = 0; index < servicios.length; index++) { 
        
            const element = servicios[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Servicios.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Servicios);
sequelizePaginate.paginate(Servicios);
module.exports = Servicios;
