/**
 * obras.js
 * @description :: sequelize model of database table obras
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Obras = sequelize.define('obras',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  referencia:{ type:DataTypes.STRING },
  referencia_erronea:{ type:DataTypes.STRING },
  ano:{ type:DataTypes.INTEGER },
  placa:{ type:DataTypes.STRING },
  artista_id:{ type:DataTypes.BIGINT },
  disciplina_id:{ type:DataTypes.BIGINT },
  catalogo_id:{ type:DataTypes.BIGINT },
  propiedad_id:{ type:DataTypes.BIGINT },
  localizacion_id:{ type:DataTypes.BIGINT },
  titulo:{ type:DataTypes.STRING },
  serie:{ type:DataTypes.STRING },
  forma_pago:{ type:DataTypes.STRING },
  observaciones:{ type:DataTypes.TEXT },
  firma:{ type:DataTypes.INTEGER },
  compra:{ type:DataTypes.INTEGER },
  pago:{ type:DataTypes.INTEGER },
  alto:{ type:DataTypes.INTEGER },
  largo:{ type:DataTypes.INTEGER },
  ancho:{ type:DataTypes.INTEGER },
  alto_marco:{ type:DataTypes.INTEGER },
  largo_marco:{ type:DataTypes.INTEGER },
  ancho_marco:{ type:DataTypes.INTEGER },
  distancia_hembrillas:{ type:DataTypes.STRING },
  artistas:{ type:DataTypes.STRING },
  foto:{ type:DataTypes.STRING },
  ficheros:{ type:DataTypes.STRING },
  qr:{ type:DataTypes.STRING },
  inscripciones:{ type:DataTypes.TEXT },
  tecnica_material:{ type:DataTypes.STRING },
  ak_form_fields_manager:{ type:DataTypes.TEXT },
  sort_order:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  deleted_at:{ type:DataTypes.DATE },
  created_by:{ type:DataTypes.BIGINT },
  updated_by:{ type:DataTypes.BIGINT },
  deleted_by:{ type:DataTypes.BIGINT },
  created_by_team:{ type:DataTypes.BIGINT },
  updated_at:{ type:DataTypes.DATE },
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
      async function (obras,options){
        obras.isActive = true;
        obras.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (obras,options){
        if (obras !== undefined && obras.length) { 
          for (let index = 0; index < obras.length; index++) { 
        
            const element = obras[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Obras.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Obras);
sequelizePaginate.paginate(Obras);
module.exports = Obras;
