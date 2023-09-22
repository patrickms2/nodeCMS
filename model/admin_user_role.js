/**
 * admin_user_role.js
 * @description :: sequelize model of database table admin_user_role
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_user_role = sequelize.define('admin_user_role',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  admin_users_id:{ type:DataTypes.BIGINT },
  admin_roles_id:{ type:DataTypes.BIGINT },
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
      async function (admin_user_role,options){
        admin_user_role.isActive = true;
        admin_user_role.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_user_role,options){
        if (admin_user_role !== undefined && admin_user_role.length) { 
          for (let index = 0; index < admin_user_role.length; index++) { 
        
            const element = admin_user_role[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_user_role.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_user_role);
sequelizePaginate.paginate(Admin_user_role);
module.exports = Admin_user_role;
