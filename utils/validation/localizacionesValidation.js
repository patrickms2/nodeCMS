/**
 * localizacionesValidation.js
 * @description :: validate each post and put request as per localizaciones model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of localizaciones */
exports.schemaKeys = joi.object({
  nombre: joi.string().allow(null).allow(''),
  referencia: joi.string().allow(null).allow(''),
  propiedad_id: joi.number().integer().allow(0),
  tipo: joi.string().allow(null).allow(''),
  imagen: joi.string().allow(null).allow(''),
  qr: joi.string().allow(null).allow(''),
  estado: joi.number().integer().allow(0),
  fichero: joi.string().allow(null).allow(''),
  latitude: joi.string().allow(null).allow(''),
  longitude: joi.string().allow(null).allow(''),
  descripcion: joi.any(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  deleted_by: joi.number().integer().allow(0),
  created_by_team: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of localizaciones for updation */
exports.updateSchemaKeys = joi.object({
  nombre: joi.string().allow(null).allow(''),
  referencia: joi.string().allow(null).allow(''),
  propiedad_id: joi.number().integer().allow(0),
  tipo: joi.string().allow(null).allow(''),
  imagen: joi.string().allow(null).allow(''),
  qr: joi.string().allow(null).allow(''),
  estado: joi.number().integer().allow(0),
  fichero: joi.string().allow(null).allow(''),
  latitude: joi.string().allow(null).allow(''),
  longitude: joi.string().allow(null).allow(''),
  descripcion: joi.any(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  deleted_by: joi.number().integer().allow(0),
  created_by_team: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of localizaciones for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      nombre: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      referencia: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      propiedad_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      tipo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      imagen: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      qr: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      estado: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      fichero: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      latitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      longitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      descripcion: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      deleted_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      created_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updated_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      deleted_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_by_team: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
