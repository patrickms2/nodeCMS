/**
 * obrasValidation.js
 * @description :: validate each post and put request as per obras model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of obras */
exports.schemaKeys = joi.object({
  referencia: joi.string().allow(null).allow(''),
  referencia_erronea: joi.string().allow(null).allow(''),
  ano: joi.number().integer().allow(0),
  placa: joi.string().allow(null).allow(''),
  artista_id: joi.number().integer().allow(0),
  disciplina_id: joi.number().integer().allow(0),
  catalogo_id: joi.number().integer().allow(0),
  propiedad_id: joi.number().integer().allow(0),
  localizacion_id: joi.number().integer().allow(0),
  titulo: joi.string().allow(null).allow(''),
  serie: joi.string().allow(null).allow(''),
  forma_pago: joi.string().allow(null).allow(''),
  observaciones: joi.any(),
  firma: joi.number().integer().allow(0),
  compra: joi.number().integer().allow(0),
  pago: joi.number().integer().allow(0),
  alto: joi.number().integer().allow(0),
  largo: joi.number().integer().allow(0),
  ancho: joi.number().integer().allow(0),
  alto_marco: joi.number().integer().allow(0),
  largo_marco: joi.number().integer().allow(0),
  ancho_marco: joi.number().integer().allow(0),
  distancia_hembrillas: joi.string().allow(null).allow(''),
  artistas: joi.string().allow(null).allow(''),
  foto: joi.string().allow(null).allow(''),
  ficheros: joi.string().allow(null).allow(''),
  qr: joi.string().allow(null).allow(''),
  inscripciones: joi.any(),
  tecnica_material: joi.string().allow(null).allow(''),
  ak_form_fields_manager: joi.any(),
  sort_order: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  deleted_by: joi.number().integer().allow(0),
  created_by_team: joi.number().integer().allow(0),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of obras for updation */
exports.updateSchemaKeys = joi.object({
  referencia: joi.string().allow(null).allow(''),
  referencia_erronea: joi.string().allow(null).allow(''),
  ano: joi.number().integer().allow(0),
  placa: joi.string().allow(null).allow(''),
  artista_id: joi.number().integer().allow(0),
  disciplina_id: joi.number().integer().allow(0),
  catalogo_id: joi.number().integer().allow(0),
  propiedad_id: joi.number().integer().allow(0),
  localizacion_id: joi.number().integer().allow(0),
  titulo: joi.string().allow(null).allow(''),
  serie: joi.string().allow(null).allow(''),
  forma_pago: joi.string().allow(null).allow(''),
  observaciones: joi.any(),
  firma: joi.number().integer().allow(0),
  compra: joi.number().integer().allow(0),
  pago: joi.number().integer().allow(0),
  alto: joi.number().integer().allow(0),
  largo: joi.number().integer().allow(0),
  ancho: joi.number().integer().allow(0),
  alto_marco: joi.number().integer().allow(0),
  largo_marco: joi.number().integer().allow(0),
  ancho_marco: joi.number().integer().allow(0),
  distancia_hembrillas: joi.string().allow(null).allow(''),
  artistas: joi.string().allow(null).allow(''),
  foto: joi.string().allow(null).allow(''),
  ficheros: joi.string().allow(null).allow(''),
  qr: joi.string().allow(null).allow(''),
  inscripciones: joi.any(),
  tecnica_material: joi.string().allow(null).allow(''),
  ak_form_fields_manager: joi.any(),
  sort_order: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_by: joi.number().integer().allow(0),
  deleted_by: joi.number().integer().allow(0),
  created_by_team: joi.number().integer().allow(0),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of obras for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      referencia: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      referencia_erronea: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ano: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      placa: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      artista_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      disciplina_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      catalogo_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      propiedad_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      localizacion_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      titulo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      serie: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      forma_pago: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      observaciones: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      firma: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      compra: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      pago: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      alto: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      largo: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ancho: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      alto_marco: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      largo_marco: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ancho_marco: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      distancia_hembrillas: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      artistas: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      foto: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ficheros: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      qr: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      inscripciones: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      tecnica_material: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ak_form_fields_manager: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      sort_order: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      deleted_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      created_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updated_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      deleted_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_by_team: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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
