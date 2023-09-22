/**
 * pagebuilder__page_translations.js
 * @description :: sequelize model of database table pagebuilder__page_translations
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Pagebuilder__page_translations = sequelize.define('pagebuilder__page_translations',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  page_id:{ type:DataTypes.INTEGER },
  locale:{ type:DataTypes.STRING },
  title:{ type:DataTypes.STRING },
  route:{ type:DataTypes.STRING },
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
      async function (pagebuilder__page_translations,options){
        pagebuilder__page_translations.isActive = true;
        pagebuilder__page_translations.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (pagebuilder__page_translations,options){
        if (pagebuilder__page_translations !== undefined && pagebuilder__page_translations.length) { 
          for (let index = 0; index < pagebuilder__page_translations.length; index++) { 
        
            const element = pagebuilder__page_translations[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Pagebuilder__page_translations.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Pagebuilder__page_translations);
sequelizePaginate.paginate(Pagebuilder__page_translations);
module.exports = Pagebuilder__page_translations;
