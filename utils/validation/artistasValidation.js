/**
 * artistasValidation.js
 * @description :: validate each post and put request as per artistas model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of artistas */
exports.schemaKeys = joi.object({
  referencia_artista: joi.string().allow(null).allow(''),
  nombre: joi.string().allow(null).allow(''),
  apellidos: joi.string().allow(null).allow(''),
  nombre_artistico: joi.string().allow(null).allow(''),
  nombre_grupo: joi.string().allow(null).allow(''),
  nacionalidad: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  telfono: joi.string().allow(null).allow(''),
  telefono: joi.string().allow(null).allow(''),
  fecha_nacimiento: joi.string().allow(null).allow(''),
  estancias_1: joi.string().allow(null).allow(''),
  procedencia: joi.string().allow(null).allow(''),
  estancias: joi.string().allow(null).allow(''),
  presencia_red: joi.any(),
  youtube: joi.string().allow(null).allow(''),
  foto: joi.string().allow(null).allow(''),
  curriculum: joi.string().allow(null).allow(''),
  id_localizacion: joi.number().integer().allow(0),
  localizaciones: joi.string().allow(null).allow(''),
  artistas: joi.string().allow(null).allow(''),
  codartista: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  deleted_by: joi.number().integer().allow(0),
  disciplina_id: joi.number().integer().allow(0),
  facebook: joi.string().allow(null).allow(''),
  twitter: joi.string().allow(null).allow(''),
  instagram: joi.string().allow(null).allow(''),
  linkedlin: joi.string().allow(null).allow(''),
  entrevista: joi.string().allow(null).allow(''),
  otra: joi.string().allow(null).allow(''),
  observaciones: joi.any(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of artistas for updation */
exports.updateSchemaKeys = joi.object({
  referencia_artista: joi.string().allow(null).allow(''),
  nombre: joi.string().allow(null).allow(''),
  apellidos: joi.string().allow(null).allow(''),
  nombre_artistico: joi.string().allow(null).allow(''),
  nombre_grupo: joi.string().allow(null).allow(''),
  nacionalidad: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  telfono: joi.string().allow(null).allow(''),
  telefono: joi.string().allow(null).allow(''),
  fecha_nacimiento: joi.string().allow(null).allow(''),
  estancias_1: joi.string().allow(null).allow(''),
  procedencia: joi.string().allow(null).allow(''),
  estancias: joi.string().allow(null).allow(''),
  presencia_red: joi.any(),
  youtube: joi.string().allow(null).allow(''),
  foto: joi.string().allow(null).allow(''),
  curriculum: joi.string().allow(null).allow(''),
  id_localizacion: joi.number().integer().allow(0),
  localizaciones: joi.string().allow(null).allow(''),
  artistas: joi.string().allow(null).allow(''),
  codartista: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  deleted_by: joi.number().integer().allow(0),
  disciplina_id: joi.number().integer().allow(0),
  facebook: joi.string().allow(null).allow(''),
  twitter: joi.string().allow(null).allow(''),
  instagram: joi.string().allow(null).allow(''),
  linkedlin: joi.string().allow(null).allow(''),
  entrevista: joi.string().allow(null).allow(''),
  otra: joi.string().allow(null).allow(''),
  observaciones: joi.any(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of artistas for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      referencia_artista: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      nombre: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      apellidos: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      nombre_artistico: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      nombre_grupo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      nacionalidad: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      telfono: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      telefono: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      fecha_nacimiento: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      estancias_1: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      procedencia: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      estancias: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      presencia_red: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      youtube: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      foto: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      curriculum: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id_localizacion: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      localizaciones: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      artistas: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      codartista: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      deleted_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      created_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updated_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      deleted_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      disciplina_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      facebook: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      twitter: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      instagram: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      linkedlin: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      entrevista: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      otra: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      observaciones: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
