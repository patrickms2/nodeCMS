/**
 * admin_auditable_logsValidation.js
 * @description :: validate each post and put request as per admin_auditable_logs model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of admin_auditable_logs */
exports.schemaKeys = joi.object({
  action: joi.string().allow(null).allow(''),
  user_id: joi.number().integer().allow(0),
  model: joi.string().allow(null).allow(''),
  row_id: joi.number().integer().allow(0),
  properties_old: joi.any(),
  properties_new: joi.any(),
  url: joi.string().allow(null).allow(''),
  ip: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of admin_auditable_logs for updation */
exports.updateSchemaKeys = joi.object({
  action: joi.string().allow(null).allow(''),
  user_id: joi.number().integer().allow(0),
  model: joi.string().allow(null).allow(''),
  row_id: joi.number().integer().allow(0),
  properties_old: joi.any(),
  properties_new: joi.any(),
  url: joi.string().allow(null).allow(''),
  ip: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of admin_auditable_logs for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      action: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      model: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      row_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      properties_old: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      properties_new: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      url: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ip: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
