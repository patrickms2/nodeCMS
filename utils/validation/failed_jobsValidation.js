/**
 * failed_jobsValidation.js
 * @description :: validate each post and put request as per failed_jobs model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of failed_jobs */
exports.schemaKeys = joi.object({
  uuid: joi.string().allow(null).allow(''),
  connection: joi.any(),
  queue: joi.any(),
  payload: joi.any(),
  exception: joi.any(),
  failed_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of failed_jobs for updation */
exports.updateSchemaKeys = joi.object({
  uuid: joi.string().allow(null).allow(''),
  connection: joi.any(),
  queue: joi.any(),
  payload: joi.any(),
  exception: joi.any(),
  failed_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of failed_jobs for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      uuid: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      connection: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      queue: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      payload: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      exception: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      failed_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
