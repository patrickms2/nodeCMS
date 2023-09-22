/**
 * personal_access_tokensValidation.js
 * @description :: validate each post and put request as per personal_access_tokens model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of personal_access_tokens */
exports.schemaKeys = joi.object({
  tokenable_type: joi.string().allow(null).allow(''),
  tokenable_id: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  token: joi.string().allow(null).allow(''),
  abilities: joi.any(),
  last_used_at: joi.date().options({ convert: true }).allow(null).allow(''),
  expires_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of personal_access_tokens for updation */
exports.updateSchemaKeys = joi.object({
  tokenable_type: joi.string().allow(null).allow(''),
  tokenable_id: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  token: joi.string().allow(null).allow(''),
  abilities: joi.any(),
  last_used_at: joi.date().options({ convert: true }).allow(null).allow(''),
  expires_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of personal_access_tokens for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      tokenable_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tokenable_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      abilities: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      last_used_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      expires_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
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
