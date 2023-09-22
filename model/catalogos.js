/**
 * catalogos.js
 * @description :: sequelize model of database table catalogos
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Catalogos = sequelize.define('catalogos',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  titulo:{ type:DataTypes.STRING },
  foto:{ type:DataTypes.STRING },
  fichero:{ type:DataTypes.STRING },
  localizacion_id:{ type:DataTypes.BIGINT },
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
      async function (catalogos,options){
        catalogos.isActive = true;
        catalogos.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (catalogos,options){
        if (catalogos !== undefined && catalogos.length) { 
          for (let index = 0; index < catalogos.length; index++) { 
        
            const element = catalogos[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Catalogos.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Catalogos);
sequelizePaginate.paginate(Catalogos);
module.exports = Catalogos;
