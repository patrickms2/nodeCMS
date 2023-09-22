/**
 * admin_user_tenancyValidation.js
 * @description :: validate each post and put request as per admin_user_tenancy model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of admin_user_tenancy */
exports.schemaKeys = joi.object({
  admin_users_id: joi.number().integer().allow(0),
  admin_user_tenancy_id: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of admin_user_tenancy for updation */
exports.updateSchemaKeys = joi.object({
  admin_users_id: joi.number().integer().allow(0),
  admin_user_tenancy_id: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of admin_user_tenancy for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      admin_users_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      admin_user_tenancy_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
