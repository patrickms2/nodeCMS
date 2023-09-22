/**
 * propiedades.js
 * @description :: sequelize model of database table propiedades
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Propiedades = sequelize.define('propiedades',{
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
      async function (propiedades,options){
        propiedades.isActive = true;
        propiedades.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (propiedades,options){
        if (propiedades !== undefined && propiedades.length) { 
          for (let index = 0; index < propiedades.length; index++) { 
        
            const element = propiedades[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Propiedades.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Propiedades);
sequelizePaginate.paginate(Propiedades);
module.exports = Propiedades;
