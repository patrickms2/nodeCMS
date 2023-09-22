/**
 * article_tag.js
 * @description :: sequelize model of database table article_tag
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Article_tag = sequelize.define('article_tag',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  article_id:{ type:DataTypes.INTEGER },
  tag_id:{ type:DataTypes.INTEGER },
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
      async function (article_tag,options){
        article_tag.isActive = true;
        article_tag.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (article_tag,options){
        if (article_tag !== undefined && article_tag.length) { 
          for (let index = 0; index < article_tag.length; index++) { 
        
            const element = article_tag[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Article_tag.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Article_tag);
sequelizePaginate.paginate(Article_tag);
module.exports = Article_tag;
