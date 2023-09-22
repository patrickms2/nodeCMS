/**
 * categories.js
 * @description :: sequelize model of database table categories
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Categories = sequelize.define('categories',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  description:{ type:DataTypes.TEXT },
  slug:{ type:DataTypes.STRING },
  picture:{ type:DataTypes.STRING },
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
      async function (categories,options){
        categories.isActive = true;
        categories.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (categories,options){
        if (categories !== undefined && categories.length) { 
          for (let index = 0; index < categories.length; index++) { 
        
            const element = categories[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Categories.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Categories);
sequelizePaginate.paginate(Categories);
module.exports = Categories;
