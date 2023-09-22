/**
 * fotoobra.js
 * @description :: sequelize model of database table fotoobra
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Fotoobra = sequelize.define('fotoobra',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
  foto:{ type:DataTypes.STRING },
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
      async function (fotoobra,options){
        fotoobra.isActive = true;
        fotoobra.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (fotoobra,options){
        if (fotoobra !== undefined && fotoobra.length) { 
          for (let index = 0; index < fotoobra.length; index++) { 
        
            const element = fotoobra[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Fotoobra.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Fotoobra);
sequelizePaginate.paginate(Fotoobra);
module.exports = Fotoobra;
