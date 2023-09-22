/**
 * migrations.js
 * @description :: sequelize model of database table migrations
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Migrations = sequelize.define('migrations',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  migration:{ type:DataTypes.STRING },
  batch:{ type:DataTypes.INTEGER },
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
      async function (migrations,options){
        migrations.isActive = true;
        migrations.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (migrations,options){
        if (migrations !== undefined && migrations.length) { 
          for (let index = 0; index < migrations.length; index++) { 
        
            const element = migrations[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Migrations.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Migrations);
sequelizePaginate.paginate(Migrations);
module.exports = Migrations;
