/**
 * failed_jobs.js
 * @description :: sequelize model of database table failed_jobs
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Failed_jobs = sequelize.define('failed_jobs',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  uuid:{ type:DataTypes.STRING },
  connection:{ type:DataTypes.TEXT },
  queue:{ type:DataTypes.TEXT },
  payload:{ type:DataTypes.TEXT },
  exception:{ type:DataTypes.TEXT },
  failed_at:{ type:DataTypes.DATE },
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
      async function (failed_jobs,options){
        failed_jobs.isActive = true;
        failed_jobs.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (failed_jobs,options){
        if (failed_jobs !== undefined && failed_jobs.length) { 
          for (let index = 0; index < failed_jobs.length; index++) { 
        
            const element = failed_jobs[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Failed_jobs.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Failed_jobs);
sequelizePaginate.paginate(Failed_jobs);
module.exports = Failed_jobs;
