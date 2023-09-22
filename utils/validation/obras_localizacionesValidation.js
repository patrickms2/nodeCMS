/**
 * obras_localizacionesValidation.js
 * @description :: validate each post and put request as per obras_localizaciones model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of obras_localizaciones */
exports.schemaKeys = joi.object({
  obras_id: joi.number().integer().allow(0),
  localizaciones_id: joi.number().integer().allow(0),
  apartespacios_id: joi.number().integer().allow(0),
  sort_order: joi.number().integer().allow(0),
  sort_selected: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of obras_localizaciones for updation */
exports.updateSchemaKeys = joi.object({
  obras_id: joi.number().integer().allow(0),
  localizaciones_id: joi.number().integer().allow(0),
  apartespacios_id: joi.number().integer().allow(0),
  sort_order: joi.number().integer().allow(0),
  sort_selected: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of obras_localizaciones for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      obras_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      localizaciones_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      apartespacios_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      sort_order: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      sort_selected: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
