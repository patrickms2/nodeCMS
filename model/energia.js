/**
 * energia.js
 * @description :: sequelize model of database table energia
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Energia = sequelize.define('energia',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
  foto:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  deleted_at:{ type:DataTypes.DATE },
  created_by:{ type:DataTypes.BIGINT },
  updated_by:{ type:DataTypes.BIGINT },
  deleted_by:{ type:DataTypes.BIGINT },
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
      async function (energia,options){
        energia.isActive = true;
        energia.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (energia,options){
        if (energia !== undefined && energia.length) { 
          for (let index = 0; index < energia.length; index++) { 
        
            const element = energia[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Energia.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Energia);
sequelizePaginate.paginate(Energia);
module.exports = Energia;
