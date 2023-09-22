/**
 * users.js
 * @description :: sequelize model of database table users
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Users = sequelize.define('users',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  about:{ type:DataTypes.STRING },
  slug:{ type:DataTypes.STRING },
  facebook:{ type:DataTypes.STRING },
  twitter:{ type:DataTypes.STRING },
  youtube:{ type:DataTypes.STRING },
  linkedin:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  email_verified_at:{ type:DataTypes.DATE },
  password:{ type:DataTypes.STRING },
  picture:{ type:DataTypes.STRING },
  role_id:{ type:DataTypes.INTEGER },
  remember_token:{ type:DataTypes.STRING },
  deleted_at:{ type:DataTypes.DATE },
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
      async function (users,options){
        users.isActive = true;
        users.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (users,options){
        if (users !== undefined && users.length) { 
          for (let index = 0; index < users.length; index++) { 
        
            const element = users[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Users.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Users);
sequelizePaginate.paginate(Users);
module.exports = Users;
