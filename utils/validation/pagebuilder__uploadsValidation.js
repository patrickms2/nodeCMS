/**
 * pagebuilder__uploadsValidation.js
 * @description :: validate each post and put request as per pagebuilder__uploads model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of pagebuilder__uploads */
exports.schemaKeys = joi.object({
  public_id: joi.string().allow(null).allow(''),
  original_file: joi.string().allow(null).allow(''),
  mime_type: joi.string().allow(null).allow(''),
  server_file: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of pagebuilder__uploads for updation */
exports.updateSchemaKeys = joi.object({
  public_id: joi.string().allow(null).allow(''),
  original_file: joi.string().allow(null).allow(''),
  mime_type: joi.string().allow(null).allow(''),
  server_file: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of pagebuilder__uploads for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      public_id: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      original_file: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mime_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      server_file: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
