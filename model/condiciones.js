/**
 * condiciones.js
 * @description :: sequelize model of database table condiciones
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Condiciones = sequelize.define('condiciones',{
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
      async function (condiciones,options){
        condiciones.isActive = true;
        condiciones.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (condiciones,options){
        if (condiciones !== undefined && condiciones.length) { 
          for (let index = 0; index < condiciones.length; index++) { 
        
            const element = condiciones[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Condiciones.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Condiciones);
sequelizePaginate.paginate(Condiciones);
module.exports = Condiciones;
