/**
 * obras_disciplinas.js
 * @description :: sequelize model of database table obras_disciplinas
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obras_disciplinas = sequelize.define('obras_disciplinas',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  obras_id:{ type:DataTypes.BIGINT },
  disciplinas_id:{ type:DataTypes.BIGINT },
  comunicaciones_id:{ type:DataTypes.BIGINT },
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
      async function (obras_disciplinas,options){
        obras_disciplinas.isActive = true;
        obras_disciplinas.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obras_disciplinas,options){
        if (obras_disciplinas !== undefined && obras_disciplinas.length) { 
          for (let index = 0; index < obras_disciplinas.length; index++) { 
        
            const element = obras_disciplinas[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obras_disciplinas.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obras_disciplinas);
sequelizePaginate.paginate(Obras_disciplinas);
module.exports = Obras_disciplinas;
