/**
 * ana_gestin.js
 * @description :: sequelize model of database table ana_gestin
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Ana_gestin = sequelize.define('ana_gestin',{
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
      async function (ana_gestin,options){
        ana_gestin.isActive = true;
        ana_gestin.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (ana_gestin,options){
        if (ana_gestin !== undefined && ana_gestin.length) { 
          for (let index = 0; index < ana_gestin.length; index++) { 
        
            const element = ana_gestin[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Ana_gestin.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Ana_gestin);
sequelizePaginate.paginate(Ana_gestin);
module.exports = Ana_gestin;
