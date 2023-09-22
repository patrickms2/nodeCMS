/**
 * password_resets.js
 * @description :: sequelize model of database table password_resets
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Password_resets = sequelize.define('password_resets',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  email:{ type:DataTypes.STRING },
  token:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
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
      async function (password_resets,options){
        password_resets.isActive = true;
        password_resets.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (password_resets,options){
        if (password_resets !== undefined && password_resets.length) { 
          for (let index = 0; index < password_resets.length; index++) { 
        
            const element = password_resets[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Password_resets.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Password_resets);
sequelizePaginate.paginate(Password_resets);
module.exports = Password_resets;
