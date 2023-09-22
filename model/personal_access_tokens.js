/**
 * personal_access_tokens.js
 * @description :: sequelize model of database table personal_access_tokens
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Personal_access_tokens = sequelize.define('personal_access_tokens',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  tokenable_type:{ type:DataTypes.STRING },
  tokenable_id:{ type:DataTypes.BIGINT },
  name:{ type:DataTypes.STRING },
  token:{ type:DataTypes.STRING },
  abilities:{ type:DataTypes.TEXT },
  last_used_at:{ type:DataTypes.DATE },
  expires_at:{ type:DataTypes.DATE },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
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
      async function (personal_access_tokens,options){
        personal_access_tokens.isActive = true;
        personal_access_tokens.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (personal_access_tokens,options){
        if (personal_access_tokens !== undefined && personal_access_tokens.length) { 
          for (let index = 0; index < personal_access_tokens.length; index++) { 
        
            const element = personal_access_tokens[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Personal_access_tokens.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Personal_access_tokens);
sequelizePaginate.paginate(Personal_access_tokens);
module.exports = Personal_access_tokens;
