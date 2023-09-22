/**
 * pagebuilder__uploads.js
 * @description :: sequelize model of database table pagebuilder__uploads
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Pagebuilder__uploads = sequelize.define('pagebuilder__uploads',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  public_id:{ type:DataTypes.STRING },
  original_file:{ type:DataTypes.STRING },
  mime_type:{ type:DataTypes.STRING },
  server_file:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
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
      async function (pagebuilder__uploads,options){
        pagebuilder__uploads.isActive = true;
        pagebuilder__uploads.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (pagebuilder__uploads,options){
        if (pagebuilder__uploads !== undefined && pagebuilder__uploads.length) { 
          for (let index = 0; index < pagebuilder__uploads.length; index++) { 
        
            const element = pagebuilder__uploads[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Pagebuilder__uploads.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Pagebuilder__uploads);
sequelizePaginate.paginate(Pagebuilder__uploads);
module.exports = Pagebuilder__uploads;
