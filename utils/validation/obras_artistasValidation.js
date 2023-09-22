/**
 * obras_artistasValidation.js
 * @description :: validate each post and put request as per obras_artistas model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of obras_artistas */
exports.schemaKeys = joi.object({
  obras_id: joi.number().integer().allow(0),
  artistas_id: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of obras_artistas for updation */
exports.updateSchemaKeys = joi.object({
  obras_id: joi.number().integer().allow(0),
  artistas_id: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of obras_artistas for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      obras_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      artistas_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
