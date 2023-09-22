/**
 * admin_role_permission.js
 * @description :: sequelize model of database table admin_role_permission
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_role_permission = sequelize.define('admin_role_permission',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  admin_roles_id:{ type:DataTypes.BIGINT },
  admin_permissions_id:{ type:DataTypes.BIGINT },
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
      async function (admin_role_permission,options){
        admin_role_permission.isActive = true;
        admin_role_permission.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_role_permission,options){
        if (admin_role_permission !== undefined && admin_role_permission.length) { 
          for (let index = 0; index < admin_role_permission.length; index++) { 
        
            const element = admin_role_permission[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_role_permission.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_role_permission);
sequelizePaginate.paginate(Admin_role_permission);
module.exports = Admin_role_permission;
