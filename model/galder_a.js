/**
 * galder_a.js
 * @description :: sequelize model of database table galder_a
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Galder_a = sequelize.define('galder_a',{
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
      async function (galder_a,options){
        galder_a.isActive = true;
        galder_a.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (galder_a,options){
        if (galder_a !== undefined && galder_a.length) { 
          for (let index = 0; index < galder_a.length; index++) { 
        
            const element = galder_a[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Galder_a.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Galder_a);
sequelizePaginate.paginate(Galder_a);
module.exports = Galder_a;
