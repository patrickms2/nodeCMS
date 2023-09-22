/**
 * paginas.js
 * @description :: sequelize model of database table paginas
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Paginas = sequelize.define('paginas',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  deleted_at:{ type:DataTypes.DATE },
  created_by:{ type:DataTypes.BIGINT },
  updated_by:{ type:DataTypes.BIGINT },
  deleted_by:{ type:DataTypes.BIGINT },
  created_by_team:{ type:DataTypes.BIGINT },
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
      async function (paginas,options){
        paginas.isActive = true;
        paginas.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (paginas,options){
        if (paginas !== undefined && paginas.length) { 
          for (let index = 0; index < paginas.length; index++) { 
        
            const element = paginas[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Paginas.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Paginas);
sequelizePaginate.paginate(Paginas);
module.exports = Paginas;
