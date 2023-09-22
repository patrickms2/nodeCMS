/**
 * gestin_de_contenidos_pane.js
 * @description :: sequelize model of database table gestin_de_contenidos_pane
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Gestin_de_contenidos_pane = sequelize.define('gestin_de_contenidos_pane',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
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
      async function (gestin_de_contenidos_pane,options){
        gestin_de_contenidos_pane.isActive = true;
        gestin_de_contenidos_pane.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (gestin_de_contenidos_pane,options){
        if (gestin_de_contenidos_pane !== undefined && gestin_de_contenidos_pane.length) { 
          for (let index = 0; index < gestin_de_contenidos_pane.length; index++) { 
        
            const element = gestin_de_contenidos_pane[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Gestin_de_contenidos_pane.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Gestin_de_contenidos_pane);
sequelizePaginate.paginate(Gestin_de_contenidos_pane);
module.exports = Gestin_de_contenidos_pane;
