/**
 * personal_access_tokensController.js
 * @description :: exports action methods for personal_access_tokens.
 */

const Personal_access_tokens = require('../../../model/personal_access_tokens');
const personal_access_tokensSchemaKey = require('../../../utils/validation/personal_access_tokensValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Personal_access_tokens in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Personal_access_tokens. {status, message, data}
 */ 
const addPersonal_access_tokens = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      personal_access_tokensSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPersonal_access_tokens = await dbService.createOne(Personal_access_tokens,dataToCreate);
    return  res.success({ data :createdPersonal_access_tokens });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Personal_access_tokens in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Personal_access_tokenss. {status, message, data}
 */
const bulkInsertPersonal_access_tokens = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPersonal_access_tokens = await dbService.createMany(Personal_access_tokens,dataToCreate); 
      return  res.success({ data :{ count :createdPersonal_access_tokens.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Personal_access_tokens from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Personal_access_tokens(s). {status, message, data}
 */
const findAllPersonal_access_tokens = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPersonal_access_tokens;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      personal_access_tokensSchemaKey.findFilterKeys,
      Personal_access_tokens.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPersonal_access_tokens = await dbService.count(Personal_access_tokens, query);
      if (!foundPersonal_access_tokens) {
        return res.recordNotFound();
      } 
      foundPersonal_access_tokens = { totalRecords: foundPersonal_access_tokens };
      return res.success({ data :foundPersonal_access_tokens });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPersonal_access_tokens = await dbService.paginate( Personal_access_tokens,query,options);
    if (!foundPersonal_access_tokens){
      return res.recordNotFound();
    }
    return res.success({ data:foundPersonal_access_tokens }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Personal_access_tokens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Personal_access_tokens. {status, message, data}
 */
const getPersonal_access_tokens = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPersonal_access_tokens = await dbService.findOne(Personal_access_tokens,{ id :id });
    if (!foundPersonal_access_tokens){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPersonal_access_tokens });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Personal_access_tokens.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPersonal_access_tokensCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      personal_access_tokensSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPersonal_access_tokens = await dbService.count(Personal_access_tokens,where);
    if (!countedPersonal_access_tokens){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPersonal_access_tokens } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Personal_access_tokens with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Personal_access_tokens.
 * @return {Object} : updated Personal_access_tokens. {status, message, data}
 */
const updatePersonal_access_tokens = async (req, res) => {
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
      personal_access_tokensSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPersonal_access_tokens = await dbService.update(Personal_access_tokens,query,dataToUpdate);
    return  res.success({ data :updatedPersonal_access_tokens }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Personal_access_tokens with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Personal_access_tokenss.
 * @return {Object} : updated Personal_access_tokenss. {status, message, data}
 */
const bulkUpdatePersonal_access_tokens = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPersonal_access_tokens = await dbService.update(Personal_access_tokens,filter,dataToUpdate);
    if (!updatedPersonal_access_tokens){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPersonal_access_tokens.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Personal_access_tokens with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Personal_access_tokens.
 * @return {Object} : updated Personal_access_tokens. {status, message, data}
 */
const partialUpdatePersonal_access_tokens = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      personal_access_tokensSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPersonal_access_tokens = await dbService.update(Personal_access_tokens, query, dataToUpdate);
    if (!updatedPersonal_access_tokens) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPersonal_access_tokens });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Personal_access_tokens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Personal_access_tokens.
 * @return {Object} : deactivated Personal_access_tokens. {status, message, data}
 */
const softDeletePersonal_access_tokens = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Personal_access_tokens, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Personal_access_tokens from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Personal_access_tokens. {status, message, data}
 */
const deletePersonal_access_tokens = async (req, res) => {
  const result = await dbService.deleteByPk(Personal_access_tokens, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Personal_access_tokens in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPersonal_access_tokens = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPersonal_access_tokens = await dbService.destroy(Personal_access_tokens,query);
    return res.success({ data :{ count :deletedPersonal_access_tokens.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Personal_access_tokens from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Personal_access_tokens.
 * @return {Object} : number of deactivated documents of Personal_access_tokens. {status, message, data}
 */
const softDeleteManyPersonal_access_tokens = async (req, res) => {
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
    let updatedPersonal_access_tokens = await dbService.update(Personal_access_tokens,query,updateBody, options);
    if (!updatedPersonal_access_tokens) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPersonal_access_tokens.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPersonal_access_tokens,
  bulkInsertPersonal_access_tokens,
  findAllPersonal_access_tokens,
  getPersonal_access_tokens,
  getPersonal_access_tokensCount,
  updatePersonal_access_tokens,
  bulkUpdatePersonal_access_tokens,
  partialUpdatePersonal_access_tokens,
  softDeletePersonal_access_tokens,
  deletePersonal_access_tokens,
  deleteManyPersonal_access_tokens,
  softDeleteManyPersonal_access_tokens,
};
