/**
 * admin_permissions.js
 * @description :: sequelize model of database table admin_permissions
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_permissions = sequelize.define('admin_permissions',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  permission_slug:{ type:DataTypes.STRING },
  custom_permission:{ type:DataTypes.INTEGER },
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
      async function (admin_permissions,options){
        admin_permissions.isActive = true;
        admin_permissions.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_permissions,options){
        if (admin_permissions !== undefined && admin_permissions.length) { 
          for (let index = 0; index < admin_permissions.length; index++) { 
        
            const element = admin_permissions[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_permissions.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_permissions);
sequelizePaginate.paginate(Admin_permissions);
module.exports = Admin_permissions;
