/**
 * pagebuilder__pages.js
 * @description :: sequelize model of database table pagebuilder__pages
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Pagebuilder__pages = sequelize.define('pagebuilder__pages',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  layout:{ type:DataTypes.STRING },
  data:{ type:DataTypes.TEXT },
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
      async function (pagebuilder__pages,options){
        pagebuilder__pages.isActive = true;
        pagebuilder__pages.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (pagebuilder__pages,options){
        if (pagebuilder__pages !== undefined && pagebuilder__pages.length) { 
          for (let index = 0; index < pagebuilder__pages.length; index++) { 
        
            const element = pagebuilder__pages[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Pagebuilder__pages.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Pagebuilder__pages);
sequelizePaginate.paginate(Pagebuilder__pages);
module.exports = Pagebuilder__pages;
