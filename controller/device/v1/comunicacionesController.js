/**
 * comunicacionesController.js
 * @description :: exports action methods for comunicaciones.
 */

const Comunicaciones = require('../../../model/comunicaciones');
const comunicacionesSchemaKey = require('../../../utils/validation/comunicacionesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Comunicaciones in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Comunicaciones. {status, message, data}
 */ 
const addComunicaciones = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      comunicacionesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdComunicaciones = await dbService.createOne(Comunicaciones,dataToCreate);
    return  res.success({ data :createdComunicaciones });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Comunicaciones in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Comunicacioness. {status, message, data}
 */
const bulkInsertComunicaciones = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdComunicaciones = await dbService.createMany(Comunicaciones,dataToCreate); 
      return  res.success({ data :{ count :createdComunicaciones.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Comunicaciones from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Comunicaciones(s). {status, message, data}
 */
const findAllComunicaciones = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundComunicaciones;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      comunicacionesSchemaKey.findFilterKeys,
      Comunicaciones.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundComunicaciones = await dbService.count(Comunicaciones, query);
      if (!foundComunicaciones) {
        return res.recordNotFound();
      } 
      foundComunicaciones = { totalRecords: foundComunicaciones };
      return res.success({ data :foundComunicaciones });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundComunicaciones = await dbService.paginate( Comunicaciones,query,options);
    if (!foundComunicaciones){
      return res.recordNotFound();
    }
    return res.success({ data:foundComunicaciones }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Comunicaciones from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Comunicaciones. {status, message, data}
 */
const getComunicaciones = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundComunicaciones = await dbService.findOne(Comunicaciones,{ id :id });
    if (!foundComunicaciones){
      return res.recordNotFound();
    }
    return  res.success({ data :foundComunicaciones });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Comunicaciones.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getComunicacionesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      comunicacionesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedComunicaciones = await dbService.count(Comunicaciones,where);
    if (!countedComunicaciones){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedComunicaciones } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Comunicaciones with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Comunicaciones.
 * @return {Object} : updated Comunicaciones. {status, message, data}
 */
const updateComunicaciones = async (req, res) => {
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
      comunicacionesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedComunicaciones = await dbService.update(Comunicaciones,query,dataToUpdate);
    return  res.success({ data :updatedComunicaciones }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Comunicaciones with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Comunicacioness.
 * @return {Object} : updated Comunicacioness. {status, message, data}
 */
const bulkUpdateComunicaciones = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedComunicaciones = await dbService.update(Comunicaciones,filter,dataToUpdate);
    if (!updatedComunicaciones){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedComunicaciones.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Comunicaciones with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Comunicaciones.
 * @return {Object} : updated Comunicaciones. {status, message, data}
 */
const partialUpdateComunicaciones = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      comunicacionesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedComunicaciones = await dbService.update(Comunicaciones, query, dataToUpdate);
    if (!updatedComunicaciones) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedComunicaciones });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Comunicaciones from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Comunicaciones.
 * @return {Object} : deactivated Comunicaciones. {status, message, data}
 */
const softDeleteComunicaciones = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Comunicaciones, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Comunicaciones from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Comunicaciones. {status, message, data}
 */
const deleteComunicaciones = async (req, res) => {
  const result = await dbService.deleteByPk(Comunicaciones, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Comunicaciones in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyComunicaciones = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedComunicaciones = await dbService.destroy(Comunicaciones,query);
    return res.success({ data :{ count :deletedComunicaciones.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Comunicaciones from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Comunicaciones.
 * @return {Object} : number of deactivated documents of Comunicaciones. {status, message, data}
 */
const softDeleteManyComunicaciones = async (req, res) => {
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
    let updatedComunicaciones = await dbService.update(Comunicaciones,query,updateBody, options);
    if (!updatedComunicaciones) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedComunicaciones.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addComunicaciones,
  bulkInsertComunicaciones,
  findAllComunicaciones,
  getComunicaciones,
  getComunicacionesCount,
  updateComunicaciones,
  bulkUpdateComunicaciones,
  partialUpdateComunicaciones,
  softDeleteComunicaciones,
  deleteComunicaciones,
  deleteManyComunicaciones,
  softDeleteManyComunicaciones,
};
