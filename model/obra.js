/**
 * obra.js
 * @description :: sequelize model of database table obra
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obra = sequelize.define('obra',{
  id:{
    type:DataTypes.STRING,
    primaryKey:true
  },
  name:{ type:DataTypes.STRING },
  disciplina_id:{ type:DataTypes.STRING },
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
      async function (obra,options){
        obra.isActive = true;
        obra.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obra,options){
        if (obra !== undefined && obra.length) { 
          for (let index = 0; index < obra.length; index++) { 
        
            const element = obra[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obra.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obra);
sequelizePaginate.paginate(Obra);
module.exports = Obra;
