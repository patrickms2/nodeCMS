/**
 * clientes.js
 * @description :: sequelize model of database table clientes
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Clientes = sequelize.define('clientes',{
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
      async function (clientes,options){
        clientes.isActive = true;
        clientes.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (clientes,options){
        if (clientes !== undefined && clientes.length) { 
          for (let index = 0; index < clientes.length; index++) { 
        
            const element = clientes[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Clientes.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Clientes);
sequelizePaginate.paginate(Clientes);
module.exports = Clientes;
