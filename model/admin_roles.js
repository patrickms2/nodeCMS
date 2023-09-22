/**
 * admin_roles.js
 * @description :: sequelize model of database table admin_roles
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_roles = sequelize.define('admin_roles',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
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
      async function (admin_roles,options){
        admin_roles.isActive = true;
        admin_roles.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_roles,options){
        if (admin_roles !== undefined && admin_roles.length) { 
          for (let index = 0; index < admin_roles.length; index++) { 
        
            const element = admin_roles[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_roles.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_roles);
sequelizePaginate.paginate(Admin_roles);
module.exports = Admin_roles;
