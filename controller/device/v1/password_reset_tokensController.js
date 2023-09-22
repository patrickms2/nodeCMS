/**
 * password_reset_tokensController.js
 * @description :: exports action methods for password_reset_tokens.
 */

const Password_reset_tokens = require('../../../model/password_reset_tokens');
const password_reset_tokensSchemaKey = require('../../../utils/validation/password_reset_tokensValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Password_reset_tokens in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Password_reset_tokens. {status, message, data}
 */ 
const addPassword_reset_tokens = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      password_reset_tokensSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPassword_reset_tokens = await dbService.createOne(Password_reset_tokens,dataToCreate);
    return  res.success({ data :createdPassword_reset_tokens });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Password_reset_tokens in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Password_reset_tokenss. {status, message, data}
 */
const bulkInsertPassword_reset_tokens = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPassword_reset_tokens = await dbService.createMany(Password_reset_tokens,dataToCreate); 
      return  res.success({ data :{ count :createdPassword_reset_tokens.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Password_reset_tokens from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Password_reset_tokens(s). {status, message, data}
 */
const findAllPassword_reset_tokens = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPassword_reset_tokens;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      password_reset_tokensSchemaKey.findFilterKeys,
      Password_reset_tokens.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPassword_reset_tokens = await dbService.count(Password_reset_tokens, query);
      if (!foundPassword_reset_tokens) {
        return res.recordNotFound();
      } 
      foundPassword_reset_tokens = { totalRecords: foundPassword_reset_tokens };
      return res.success({ data :foundPassword_reset_tokens });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPassword_reset_tokens = await dbService.paginate( Password_reset_tokens,query,options);
    if (!foundPassword_reset_tokens){
      return res.recordNotFound();
    }
    return res.success({ data:foundPassword_reset_tokens }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Password_reset_tokens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Password_reset_tokens. {status, message, data}
 */
const getPassword_reset_tokens = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPassword_reset_tokens = await dbService.findOne(Password_reset_tokens,{ id :id });
    if (!foundPassword_reset_tokens){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPassword_reset_tokens });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Password_reset_tokens.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPassword_reset_tokensCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      password_reset_tokensSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPassword_reset_tokens = await dbService.count(Password_reset_tokens,where);
    if (!countedPassword_reset_tokens){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPassword_reset_tokens } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Password_reset_tokens with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Password_reset_tokens.
 * @return {Object} : updated Password_reset_tokens. {status, message, data}
 */
const updatePassword_reset_tokens = async (req, res) => {
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
      password_reset_tokensSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPassword_reset_tokens = await dbService.update(Password_reset_tokens,query,dataToUpdate);
    return  res.success({ data :updatedPassword_reset_tokens }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Password_reset_tokens with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Password_reset_tokenss.
 * @return {Object} : updated Password_reset_tokenss. {status, message, data}
 */
const bulkUpdatePassword_reset_tokens = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPassword_reset_tokens = await dbService.update(Password_reset_tokens,filter,dataToUpdate);
    if (!updatedPassword_reset_tokens){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPassword_reset_tokens.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Password_reset_tokens with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Password_reset_tokens.
 * @return {Object} : updated Password_reset_tokens. {status, message, data}
 */
const partialUpdatePassword_reset_tokens = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      password_reset_tokensSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPassword_reset_tokens = await dbService.update(Password_reset_tokens, query, dataToUpdate);
    if (!updatedPassword_reset_tokens) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPassword_reset_tokens });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Password_reset_tokens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Password_reset_tokens.
 * @return {Object} : deactivated Password_reset_tokens. {status, message, data}
 */
const softDeletePassword_reset_tokens = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Password_reset_tokens, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Password_reset_tokens from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Password_reset_tokens. {status, message, data}
 */
const deletePassword_reset_tokens = async (req, res) => {
  const result = await dbService.deleteByPk(Password_reset_tokens, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Password_reset_tokens in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPassword_reset_tokens = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPassword_reset_tokens = await dbService.destroy(Password_reset_tokens,query);
    return res.success({ data :{ count :deletedPassword_reset_tokens.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Password_reset_tokens from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Password_reset_tokens.
 * @return {Object} : number of deactivated documents of Password_reset_tokens. {status, message, data}
 */
const softDeleteManyPassword_reset_tokens = async (req, res) => {
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
    let updatedPassword_reset_tokens = await dbService.update(Password_reset_tokens,query,updateBody, options);
    if (!updatedPassword_reset_tokens) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPassword_reset_tokens.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPassword_reset_tokens,
  bulkInsertPassword_reset_tokens,
  findAllPassword_reset_tokens,
  getPassword_reset_tokens,
  getPassword_reset_tokensCount,
  updatePassword_reset_tokens,
  bulkUpdatePassword_reset_tokens,
  partialUpdatePassword_reset_tokens,
  softDeletePassword_reset_tokens,
  deletePassword_reset_tokens,
  deleteManyPassword_reset_tokens,
  softDeleteManyPassword_reset_tokens,
};
