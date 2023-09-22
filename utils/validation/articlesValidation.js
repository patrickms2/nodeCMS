/**
 * articlesValidation.js
 * @description :: validate each post and put request as per articles model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of articles */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  content: joi.any(),
  picture: joi.string().allow(null).allow(''),
  category_id: joi.number().integer().allow(0),
  author_id: joi.number().integer().allow(0),
  status: joi.string().allow(null).allow(''),
  show_on_homepage: joi.number().integer().allow(0),
  read_time: joi.number().integer().allow(0),
  slug: joi.string().allow(null).allow(''),
  excerpt: joi.any(),
  publish_date: joi.any(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of articles for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  content: joi.any(),
  picture: joi.string().allow(null).allow(''),
  category_id: joi.number().integer().allow(0),
  author_id: joi.number().integer().allow(0),
  status: joi.string().allow(null).allow(''),
  show_on_homepage: joi.number().integer().allow(0),
  read_time: joi.number().integer().allow(0),
  slug: joi.string().allow(null).allow(''),
  excerpt: joi.any(),
  publish_date: joi.any(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of articles for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      content: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      picture: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      category_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      author_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      show_on_homepage: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      read_time: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      slug: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      excerpt: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      publish_date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
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
