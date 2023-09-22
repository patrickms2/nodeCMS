/**
 * pagebuilder__settingsValidation.js
 * @description :: validate each post and put request as per pagebuilder__settings model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of pagebuilder__settings */
exports.schemaKeys = joi.object({
  setting: joi.string().allow(null).allow(''),
  value: joi.any(),
  is_array: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of pagebuilder__settings for updation */
exports.updateSchemaKeys = joi.object({
  setting: joi.string().allow(null).allow(''),
  value: joi.any(),
  is_array: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of pagebuilder__settings for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      setting: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      value: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      is_array: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
