/**
 * articles.js
 * @description :: sequelize model of database table articles
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Articles = sequelize.define('articles',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  content:{ type:DataTypes.TEXT },
  picture:{ type:DataTypes.STRING },
  category_id:{ type:DataTypes.INTEGER },
  author_id:{ type:DataTypes.INTEGER },
  status:{ type:DataTypes.STRING },
  show_on_homepage:{ type:DataTypes.INTEGER },
  read_time:{ type:DataTypes.INTEGER },
  slug:{ type:DataTypes.STRING },
  excerpt:{ type:DataTypes.TEXT },
  publish_date:{ type:DataTypes.DATEONLY },
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
      async function (articles,options){
        articles.isActive = true;
        articles.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (articles,options){
        if (articles !== undefined && articles.length) { 
          for (let index = 0; index < articles.length; index++) { 
        
            const element = articles[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Articles.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Articles);
sequelizePaginate.paginate(Articles);
module.exports = Articles;
