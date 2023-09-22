/**
 * admin_teams.js
 * @description :: sequelize model of database table admin_teams
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_teams = sequelize.define('admin_teams',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
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
      async function (admin_teams,options){
        admin_teams.isActive = true;
        admin_teams.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_teams,options){
        if (admin_teams !== undefined && admin_teams.length) { 
          for (let index = 0; index < admin_teams.length; index++) { 
        
            const element = admin_teams[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_teams.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_teams);
sequelizePaginate.paginate(Admin_teams);
module.exports = Admin_teams;
