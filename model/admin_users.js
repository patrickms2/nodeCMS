/**
 * admin_users.js
 * @description :: sequelize model of database table admin_users
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_users = sequelize.define('admin_users',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  email_verified_at:{ type:DataTypes.DATE },
  password:{ type:DataTypes.STRING },
  image:{ type:DataTypes.TEXT },
  language:{ type:DataTypes.STRING },
  show_language:{ type:DataTypes.INTEGER },
  theme:{ type:DataTypes.STRING },
  show_theme:{ type:DataTypes.INTEGER },
  team_id:{ type:DataTypes.BIGINT },
  remember_token:{ type:DataTypes.STRING },
  reset_token:{ type:DataTypes.STRING },
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
      async function (admin_users,options){
        admin_users.isActive = true;
        admin_users.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_users,options){
        if (admin_users !== undefined && admin_users.length) { 
          for (let index = 0; index < admin_users.length; index++) { 
        
            const element = admin_users[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_users.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_users);
sequelizePaginate.paginate(Admin_users);
module.exports = Admin_users;
