/**
 * artistas_obras.js
 * @description :: sequelize model of database table artistas_obras
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Artistas_obras = sequelize.define('artistas_obras',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  artistas_id:{ type:DataTypes.BIGINT },
  obras_id:{ type:DataTypes.BIGINT },
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
      async function (artistas_obras,options){
        artistas_obras.isActive = true;
        artistas_obras.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (artistas_obras,options){
        if (artistas_obras !== undefined && artistas_obras.length) { 
          for (let index = 0; index < artistas_obras.length; index++) { 
        
            const element = artistas_obras[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Artistas_obras.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Artistas_obras);
sequelizePaginate.paginate(Artistas_obras);
module.exports = Artistas_obras;
