/**
 * propiedadesController.js
 * @description :: exports action methods for propiedades.
 */

const Propiedades = require('../../../model/propiedades');
const propiedadesSchemaKey = require('../../../utils/validation/propiedadesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Propiedades in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Propiedades. {status, message, data}
 */ 
const addPropiedades = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      propiedadesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPropiedades = await dbService.createOne(Propiedades,dataToCreate);
    return  res.success({ data :createdPropiedades });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Propiedades in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Propiedadess. {status, message, data}
 */
const bulkInsertPropiedades = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPropiedades = await dbService.createMany(Propiedades,dataToCreate); 
      return  res.success({ data :{ count :createdPropiedades.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Propiedades from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Propiedades(s). {status, message, data}
 */
const findAllPropiedades = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPropiedades;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      propiedadesSchemaKey.findFilterKeys,
      Propiedades.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPropiedades = await dbService.count(Propiedades, query);
      if (!foundPropiedades) {
        return res.recordNotFound();
      } 
      foundPropiedades = { totalRecords: foundPropiedades };
      return res.success({ data :foundPropiedades });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPropiedades = await dbService.paginate( Propiedades,query,options);
    if (!foundPropiedades){
      return res.recordNotFound();
    }
    return res.success({ data:foundPropiedades }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Propiedades from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Propiedades. {status, message, data}
 */
const getPropiedades = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPropiedades = await dbService.findOne(Propiedades,{ id :id });
    if (!foundPropiedades){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPropiedades });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Propiedades.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPropiedadesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      propiedadesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPropiedades = await dbService.count(Propiedades,where);
    if (!countedPropiedades){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPropiedades } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Propiedades with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Propiedades.
 * @return {Object} : updated Propiedades. {status, message, data}
 */
const updatePropiedades = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      propiedadesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPropiedades = await dbService.update(Propiedades,query,dataToUpdate);
    return  res.success({ data :updatedPropiedades }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Propiedades with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Propiedadess.
 * @return {Object} : updated Propiedadess. {status, message, data}
 */
const bulkUpdatePropiedades = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPropiedades = await dbService.update(Propiedades,filter,dataToUpdate);
    if (!updatedPropiedades){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPropiedades.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Propiedades with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Propiedades.
 * @return {Object} : updated Propiedades. {status, message, data}
 */
const partialUpdatePropiedades = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      propiedadesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPropiedades = await dbService.update(Propiedades, query, dataToUpdate);
    if (!updatedPropiedades) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPropiedades });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Propiedades from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Propiedades.
 * @return {Object} : deactivated Propiedades. {status, message, data}
 */
const softDeletePropiedades = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Propiedades, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Propiedades from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Propiedades. {status, message, data}
 */
const deletePropiedades = async (req, res) => {
  const result = await dbService.deleteByPk(Propiedades, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Propiedades in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPropiedades = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPropiedades = await dbService.destroy(Propiedades,query);
    return res.success({ data :{ count :deletedPropiedades.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Propiedades from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Propiedades.
 * @return {Object} : number of deactivated documents of Propiedades. {status, message, data}
 */
const softDeleteManyPropiedades = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedPropiedades = await dbService.update(Propiedades,query,updateBody, options);
    if (!updatedPropiedades) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPropiedades.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPropiedades,
  bulkInsertPropiedades,
  findAllPropiedades,
  getPropiedades,
  getPropiedadesCount,
  updatePropiedades,
  bulkUpdatePropiedades,
  partialUpdatePropiedades,
  softDeletePropiedades,
  deletePropiedades,
  deleteManyPropiedades,
  softDeleteManyPropiedades,
};
