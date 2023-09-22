/**
 * artistas.js
 * @description :: sequelize model of database table artistas
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Artistas = sequelize.define('artistas',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  referencia_artista:{ type:DataTypes.STRING },
  nombre:{ type:DataTypes.STRING },
  apellidos:{ type:DataTypes.STRING },
  nombre_artistico:{ type:DataTypes.STRING },
  nombre_grupo:{ type:DataTypes.STRING },
  nacionalidad:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  telfono:{ type:DataTypes.STRING },
  telefono:{ type:DataTypes.STRING },
  fecha_nacimiento:{ type:DataTypes.STRING },
  estancias_1:{ type:DataTypes.STRING },
  procedencia:{ type:DataTypes.STRING },
  estancias:{ type:DataTypes.STRING },
  presencia_red:{ type:DataTypes.TEXT },
  youtube:{ type:DataTypes.STRING },
  foto:{ type:DataTypes.STRING },
  curriculum:{ type:DataTypes.STRING },
  id_localizacion:{ type:DataTypes.BIGINT },
  localizaciones:{ type:DataTypes.STRING },
  artistas:{ type:DataTypes.STRING },
  codartista:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  deleted_at:{ type:DataTypes.DATE },
  created_by:{ type:DataTypes.BIGINT },
  updated_by:{ type:DataTypes.BIGINT },
  deleted_by:{ type:DataTypes.BIGINT },
  disciplina_id:{ type:DataTypes.BIGINT },
  facebook:{ type:DataTypes.STRING },
  twitter:{ type:DataTypes.STRING },
  instagram:{ type:DataTypes.STRING },
  linkedlin:{ type:DataTypes.STRING },
  entrevista:{ type:DataTypes.STRING },
  otra:{ type:DataTypes.STRING },
  observaciones:{ type:DataTypes.TEXT },
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
      async function (artistas,options){
        artistas.isActive = true;
        artistas.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (artistas,options){
        if (artistas !== undefined && artistas.length) { 
          for (let index = 0; index < artistas.length; index++) { 
        
            const element = artistas[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Artistas.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Artistas);
sequelizePaginate.paginate(Artistas);
module.exports = Artistas;
