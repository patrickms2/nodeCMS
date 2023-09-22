/**
 * failed_jobsController.js
 * @description :: exports action methods for failed_jobs.
 */

const Failed_jobs = require('../../../model/failed_jobs');
const failed_jobsSchemaKey = require('../../../utils/validation/failed_jobsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Failed_jobs in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Failed_jobs. {status, message, data}
 */ 
const addFailed_jobs = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      failed_jobsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdFailed_jobs = await dbService.createOne(Failed_jobs,dataToCreate);
    return  res.success({ data :createdFailed_jobs });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Failed_jobs in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Failed_jobss. {status, message, data}
 */
const bulkInsertFailed_jobs = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdFailed_jobs = await dbService.createMany(Failed_jobs,dataToCreate); 
      return  res.success({ data :{ count :createdFailed_jobs.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Failed_jobs from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Failed_jobs(s). {status, message, data}
 */
const findAllFailed_jobs = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundFailed_jobs;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      failed_jobsSchemaKey.findFilterKeys,
      Failed_jobs.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundFailed_jobs = await dbService.count(Failed_jobs, query);
      if (!foundFailed_jobs) {
        return res.recordNotFound();
      } 
      foundFailed_jobs = { totalRecords: foundFailed_jobs };
      return res.success({ data :foundFailed_jobs });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundFailed_jobs = await dbService.paginate( Failed_jobs,query,options);
    if (!foundFailed_jobs){
      return res.recordNotFound();
    }
    return res.success({ data:foundFailed_jobs }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Failed_jobs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Failed_jobs. {status, message, data}
 */
const getFailed_jobs = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundFailed_jobs = await dbService.findOne(Failed_jobs,{ id :id });
    if (!foundFailed_jobs){
      return res.recordNotFound();
    }
    return  res.success({ data :foundFailed_jobs });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Failed_jobs.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getFailed_jobsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      failed_jobsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedFailed_jobs = await dbService.count(Failed_jobs,where);
    if (!countedFailed_jobs){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedFailed_jobs } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Failed_jobs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Failed_jobs.
 * @return {Object} : updated Failed_jobs. {status, message, data}
 */
const updateFailed_jobs = async (req, res) => {
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
      failed_jobsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedFailed_jobs = await dbService.update(Failed_jobs,query,dataToUpdate);
    return  res.success({ data :updatedFailed_jobs }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Failed_jobs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Failed_jobss.
 * @return {Object} : updated Failed_jobss. {status, message, data}
 */
const bulkUpdateFailed_jobs = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedFailed_jobs = await dbService.update(Failed_jobs,filter,dataToUpdate);
    if (!updatedFailed_jobs){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedFailed_jobs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Failed_jobs with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Failed_jobs.
 * @return {Object} : updated Failed_jobs. {status, message, data}
 */
const partialUpdateFailed_jobs = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      failed_jobsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedFailed_jobs = await dbService.update(Failed_jobs, query, dataToUpdate);
    if (!updatedFailed_jobs) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedFailed_jobs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Failed_jobs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Failed_jobs.
 * @return {Object} : deactivated Failed_jobs. {status, message, data}
 */
const softDeleteFailed_jobs = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Failed_jobs, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Failed_jobs from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Failed_jobs. {status, message, data}
 */
const deleteFailed_jobs = async (req, res) => {
  const result = await dbService.deleteByPk(Failed_jobs, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Failed_jobs in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyFailed_jobs = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedFailed_jobs = await dbService.destroy(Failed_jobs,query);
    return res.success({ data :{ count :deletedFailed_jobs.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Failed_jobs from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Failed_jobs.
 * @return {Object} : number of deactivated documents of Failed_jobs. {status, message, data}
 */
const softDeleteManyFailed_jobs = async (req, res) => {
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
    let updatedFailed_jobs = await dbService.update(Failed_jobs,query,updateBody, options);
    if (!updatedFailed_jobs) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedFailed_jobs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addFailed_jobs,
  bulkInsertFailed_jobs,
  findAllFailed_jobs,
  getFailed_jobs,
  getFailed_jobsCount,
  updateFailed_jobs,
  bulkUpdateFailed_jobs,
  partialUpdateFailed_jobs,
  softDeleteFailed_jobs,
  deleteFailed_jobs,
  deleteManyFailed_jobs,
  softDeleteManyFailed_jobs,
};
