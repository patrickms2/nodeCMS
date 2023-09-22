/**
 * obras_documentosController.js
 * @description :: exports action methods for obras_documentos.
 */

const Obras_documentos = require('../../../model/obras_documentos');
const obras_documentosSchemaKey = require('../../../utils/validation/obras_documentosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Obras_documentos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Obras_documentos. {status, message, data}
 */ 
const addObras_documentos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      obras_documentosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdObras_documentos = await dbService.createOne(Obras_documentos,dataToCreate);
    return  res.success({ data :createdObras_documentos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Obras_documentos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Obras_documentoss. {status, message, data}
 */
const bulkInsertObras_documentos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdObras_documentos = await dbService.createMany(Obras_documentos,dataToCreate); 
      return  res.success({ data :{ count :createdObras_documentos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Obras_documentos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Obras_documentos(s). {status, message, data}
 */
const findAllObras_documentos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundObras_documentos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      obras_documentosSchemaKey.findFilterKeys,
      Obras_documentos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundObras_documentos = await dbService.count(Obras_documentos, query);
      if (!foundObras_documentos) {
        return res.recordNotFound();
      } 
      foundObras_documentos = { totalRecords: foundObras_documentos };
      return res.success({ data :foundObras_documentos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundObras_documentos = await dbService.paginate( Obras_documentos,query,options);
    if (!foundObras_documentos){
      return res.recordNotFound();
    }
    return res.success({ data:foundObras_documentos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Obras_documentos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Obras_documentos. {status, message, data}
 */
const getObras_documentos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundObras_documentos = await dbService.findOne(Obras_documentos,{ id :id });
    if (!foundObras_documentos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundObras_documentos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Obras_documentos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getObras_documentosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      obras_documentosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedObras_documentos = await dbService.count(Obras_documentos,where);
    if (!countedObras_documentos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedObras_documentos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Obras_documentos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_documentos.
 * @return {Object} : updated Obras_documentos. {status, message, data}
 */
const updateObras_documentos = async (req, res) => {
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
      obras_documentosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedObras_documentos = await dbService.update(Obras_documentos,query,dataToUpdate);
    return  res.success({ data :updatedObras_documentos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Obras_documentos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_documentoss.
 * @return {Object} : updated Obras_documentoss. {status, message, data}
 */
const bulkUpdateObras_documentos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedObras_documentos = await dbService.update(Obras_documentos,filter,dataToUpdate);
    if (!updatedObras_documentos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedObras_documentos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Obras_documentos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_documentos.
 * @return {Object} : updated Obras_documentos. {status, message, data}
 */
const partialUpdateObras_documentos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      obras_documentosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedObras_documentos = await dbService.update(Obras_documentos, query, dataToUpdate);
    if (!updatedObras_documentos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedObras_documentos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Obras_documentos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Obras_documentos.
 * @return {Object} : deactivated Obras_documentos. {status, message, data}
 */
const softDeleteObras_documentos = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Obras_documentos, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Obras_documentos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Obras_documentos. {status, message, data}
 */
const deleteObras_documentos = async (req, res) => {
  const result = await dbService.deleteByPk(Obras_documentos, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Obras_documentos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyObras_documentos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedObras_documentos = await dbService.destroy(Obras_documentos,query);
    return res.success({ data :{ count :deletedObras_documentos.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Obras_documentos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Obras_documentos.
 * @return {Object} : number of deactivated documents of Obras_documentos. {status, message, data}
 */
const softDeleteManyObras_documentos = async (req, res) => {
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
    let updatedObras_documentos = await dbService.update(Obras_documentos,query,updateBody, options);
    if (!updatedObras_documentos) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedObras_documentos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addObras_documentos,
  bulkInsertObras_documentos,
  findAllObras_documentos,
  getObras_documentos,
  getObras_documentosCount,
  updateObras_documentos,
  bulkUpdateObras_documentos,
  partialUpdateObras_documentos,
  softDeleteObras_documentos,
  deleteObras_documentos,
  deleteManyObras_documentos,
  softDeleteManyObras_documentos,
};
