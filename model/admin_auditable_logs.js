/**
 * admin_auditable_logs.js
 * @description :: sequelize model of database table admin_auditable_logs
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_auditable_logs = sequelize.define('admin_auditable_logs',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  action:{ type:DataTypes.STRING },
  user_id:{ type:DataTypes.BIGINT },
  model:{ type:DataTypes.STRING },
  row_id:{ type:DataTypes.BIGINT },
  properties_old:{ type:DataTypes.TEXT },
  properties_new:{ type:DataTypes.TEXT },
  url:{ type:DataTypes.STRING },
  ip:{ type:DataTypes.STRING },
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
      async function (admin_auditable_logs,options){
        admin_auditable_logs.isActive = true;
        admin_auditable_logs.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_auditable_logs,options){
        if (admin_auditable_logs !== undefined && admin_auditable_logs.length) { 
          for (let index = 0; index < admin_auditable_logs.length; index++) { 
        
            const element = admin_auditable_logs[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_auditable_logs.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_auditable_logs);
sequelizePaginate.paginate(Admin_auditable_logs);
module.exports = Admin_auditable_logs;
