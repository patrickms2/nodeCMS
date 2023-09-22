/**
 * patrick_tecnologa.js
 * @description :: sequelize model of database table patrick_tecnologa
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Patrick_tecnologa = sequelize.define('patrick_tecnologa',{
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
      async function (patrick_tecnologa,options){
        patrick_tecnologa.isActive = true;
        patrick_tecnologa.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (patrick_tecnologa,options){
        if (patrick_tecnologa !== undefined && patrick_tecnologa.length) { 
          for (let index = 0; index < patrick_tecnologa.length; index++) { 
        
            const element = patrick_tecnologa[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Patrick_tecnologa.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Patrick_tecnologa);
sequelizePaginate.paginate(Patrick_tecnologa);
module.exports = Patrick_tecnologa;
