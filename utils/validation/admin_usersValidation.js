/**
 * admin_usersValidation.js
 * @description :: validate each post and put request as per admin_users model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of admin_users */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  email_verified_at: joi.date().options({ convert: true }).allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  image: joi.any(),
  language: joi.string().allow(null).allow(''),
  show_language: joi.number().integer().allow(0),
  theme: joi.string().allow(null).allow(''),
  show_theme: joi.number().integer().allow(0),
  team_id: joi.number().integer().allow(0),
  remember_token: joi.string().allow(null).allow(''),
  reset_token: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of admin_users for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  email_verified_at: joi.date().options({ convert: true }).allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  image: joi.any(),
  language: joi.string().allow(null).allow(''),
  show_language: joi.number().integer().allow(0),
  theme: joi.string().allow(null).allow(''),
  show_theme: joi.number().integer().allow(0),
  team_id: joi.number().integer().allow(0),
  remember_token: joi.string().allow(null).allow(''),
  reset_token: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of admin_users for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email_verified_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      language: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      show_language: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      theme: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      show_theme: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      team_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      remember_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      reset_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
