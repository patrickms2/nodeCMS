/**
 * pages.js
 * @description :: sequelize model of database table pages
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Pages = sequelize.define('pages',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  layout:{ type:DataTypes.STRING },
  data:{ type:DataTypes.TEXT },
  updated_at:{ type:DataTypes.DATE },
  created_at:{ type:DataTypes.DATE },
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
      async function (pages,options){
        pages.isActive = true;
        pages.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (pages,options){
        if (pages !== undefined && pages.length) { 
          for (let index = 0; index < pages.length; index++) { 
        
            const element = pages[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Pages.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Pages);
sequelizePaginate.paginate(Pages);
module.exports = Pages;
