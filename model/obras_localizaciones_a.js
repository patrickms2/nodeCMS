/**
 * obras_localizaciones_a.js
 * @description :: sequelize model of database table obras_localizaciones_a
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obras_localizaciones_a = sequelize.define('obras_localizaciones_a',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  localizaciones_id:{ type:DataTypes.BIGINT },
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
      async function (obras_localizaciones_a,options){
        obras_localizaciones_a.isActive = true;
        obras_localizaciones_a.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obras_localizaciones_a,options){
        if (obras_localizaciones_a !== undefined && obras_localizaciones_a.length) { 
          for (let index = 0; index < obras_localizaciones_a.length; index++) { 
        
            const element = obras_localizaciones_a[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obras_localizaciones_a.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obras_localizaciones_a);
sequelizePaginate.paginate(Obras_localizaciones_a);
module.exports = Obras_localizaciones_a;
