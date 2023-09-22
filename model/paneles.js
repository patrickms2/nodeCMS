/**
 * paneles.js
 * @description :: sequelize model of database table paneles
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Paneles = sequelize.define('paneles',{
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
      async function (paneles,options){
        paneles.isActive = true;
        paneles.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (paneles,options){
        if (paneles !== undefined && paneles.length) { 
          for (let index = 0; index < paneles.length; index++) { 
        
            const element = paneles[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Paneles.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Paneles);
sequelizePaginate.paginate(Paneles);
module.exports = Paneles;
