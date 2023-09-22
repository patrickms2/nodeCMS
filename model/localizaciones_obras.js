/**
 * localizaciones_obras.js
 * @description :: sequelize model of database table localizaciones_obras
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Localizaciones_obras = sequelize.define('localizaciones_obras',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  localizaciones_id:{ type:DataTypes.BIGINT },
  obras_id:{ type:DataTypes.BIGINT },
  sort_order:{ type:DataTypes.INTEGER },
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
      async function (localizaciones_obras,options){
        localizaciones_obras.isActive = true;
        localizaciones_obras.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (localizaciones_obras,options){
        if (localizaciones_obras !== undefined && localizaciones_obras.length) { 
          for (let index = 0; index < localizaciones_obras.length; index++) { 
        
            const element = localizaciones_obras[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Localizaciones_obras.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Localizaciones_obras);
sequelizePaginate.paginate(Localizaciones_obras);
module.exports = Localizaciones_obras;
