/**
 * alejandro.js
 * @description :: sequelize model of database table alejandro
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Alejandro = sequelize.define('alejandro',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
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
      async function (alejandro,options){
        alejandro.isActive = true;
        alejandro.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (alejandro,options){
        if (alejandro !== undefined && alejandro.length) { 
          for (let index = 0; index < alejandro.length; index++) { 
        
            const element = alejandro[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Alejandro.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Alejandro);
sequelizePaginate.paginate(Alejandro);
module.exports = Alejandro;
