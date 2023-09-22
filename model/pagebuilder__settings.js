/**
 * pagebuilder__settings.js
 * @description :: sequelize model of database table pagebuilder__settings
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Pagebuilder__settings = sequelize.define('pagebuilder__settings',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  setting:{ type:DataTypes.STRING },
  value:{ type:DataTypes.TEXT },
  is_array:{ type:DataTypes.INTEGER },
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
      async function (pagebuilder__settings,options){
        pagebuilder__settings.isActive = true;
        pagebuilder__settings.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (pagebuilder__settings,options){
        if (pagebuilder__settings !== undefined && pagebuilder__settings.length) { 
          for (let index = 0; index < pagebuilder__settings.length; index++) { 
        
            const element = pagebuilder__settings[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Pagebuilder__settings.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Pagebuilder__settings);
sequelizePaginate.paginate(Pagebuilder__settings);
module.exports = Pagebuilder__settings;
