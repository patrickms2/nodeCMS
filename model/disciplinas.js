/**
 * disciplinas.js
 * @description :: sequelize model of database table disciplinas
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Disciplinas = sequelize.define('disciplinas',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  nombre:{ type:DataTypes.STRING },
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
      async function (disciplinas,options){
        disciplinas.isActive = true;
        disciplinas.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (disciplinas,options){
        if (disciplinas !== undefined && disciplinas.length) { 
          for (let index = 0; index < disciplinas.length; index++) { 
        
            const element = disciplinas[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Disciplinas.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Disciplinas);
sequelizePaginate.paginate(Disciplinas);
module.exports = Disciplinas;
