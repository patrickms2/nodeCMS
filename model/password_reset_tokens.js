/**
 * password_reset_tokens.js
 * @description :: sequelize model of database table password_reset_tokens
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Password_reset_tokens = sequelize.define('password_reset_tokens',{
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
      async function (password_reset_tokens,options){
        password_reset_tokens.isActive = true;
        password_reset_tokens.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (password_reset_tokens,options){
        if (password_reset_tokens !== undefined && password_reset_tokens.length) { 
          for (let index = 0; index < password_reset_tokens.length; index++) { 
        
            const element = password_reset_tokens[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Password_reset_tokens.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Password_reset_tokens);
sequelizePaginate.paginate(Password_reset_tokens);
module.exports = Password_reset_tokens;
