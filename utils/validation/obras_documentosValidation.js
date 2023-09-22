/**
 * obras_documentosValidation.js
 * @description :: validate each post and put request as per obras_documentos model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of obras_documentos */
exports.schemaKeys = joi.object({
  nombre: joi.string().allow(null).allow(''),
  fichero: joi.string().allow(null).allow(''),
  tipo: joi.number().integer().allow(0),
  obras_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of obras_documentos for updation */
exports.updateSchemaKeys = joi.object({
  nombre: joi.string().allow(null).allow(''),
  fichero: joi.string().allow(null).allow(''),
  tipo: joi.number().integer().allow(0),
  obras_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of obras_documentos for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      nombre: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      fichero: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tipo: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      obras_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      deleted_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
