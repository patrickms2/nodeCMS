/**
 * admin_user_tenancy.js
 * @description :: sequelize model of database table admin_user_tenancy
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_user_tenancy = sequelize.define('admin_user_tenancy',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  admin_users_id:{ type:DataTypes.BIGINT },
  admin_user_tenancy_id:{ type:DataTypes.BIGINT },
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
      async function (admin_user_tenancy,options){
        admin_user_tenancy.isActive = true;
        admin_user_tenancy.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_user_tenancy,options){
        if (admin_user_tenancy !== undefined && admin_user_tenancy.length) { 
          for (let index = 0; index < admin_user_tenancy.length; index++) { 
        
            const element = admin_user_tenancy[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_user_tenancy.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_user_tenancy);
sequelizePaginate.paginate(Admin_user_tenancy);
module.exports = Admin_user_tenancy;
