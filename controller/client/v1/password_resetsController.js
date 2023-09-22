/**
 * password_resetsController.js
 * @description :: exports action methods for password_resets.
 */

const Password_resets = require('../../../model/password_resets');
const password_resetsSchemaKey = require('../../../utils/validation/password_resetsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Password_resets in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Password_resets. {status, message, data}
 */ 
const addPassword_resets = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      password_resetsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPassword_resets = await dbService.createOne(Password_resets,dataToCreate);
    return  res.success({ data :createdPassword_resets });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Password_resets in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Password_resetss. {status, message, data}
 */
const bulkInsertPassword_resets = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPassword_resets = await dbService.createMany(Password_resets,dataToCreate); 
      return  res.success({ data :{ count :createdPassword_resets.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Password_resets from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Password_resets(s). {status, message, data}
 */
const findAllPassword_resets = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPassword_resets;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      password_resetsSchemaKey.findFilterKeys,
      Password_resets.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPassword_resets = await dbService.count(Password_resets, query);
      if (!foundPassword_resets) {
        return res.recordNotFound();
      } 
      foundPassword_resets = { totalRecords: foundPassword_resets };
      return res.success({ data :foundPassword_resets });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPassword_resets = await dbService.paginate( Password_resets,query,options);
    if (!foundPassword_resets){
      return res.recordNotFound();
    }
    return res.success({ data:foundPassword_resets }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Password_resets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Password_resets. {status, message, data}
 */
const getPassword_resets = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPassword_resets = await dbService.findOne(Password_resets,{ id :id });
    if (!foundPassword_resets){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPassword_resets });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Password_resets.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPassword_resetsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      password_resetsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPassword_resets = await dbService.count(Password_resets,where);
    if (!countedPassword_resets){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPassword_resets } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Password_resets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Password_resets.
 * @return {Object} : updated Password_resets. {status, message, data}
 */
const updatePassword_resets = async (req, res) => {
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
      password_resetsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPassword_resets = await dbService.update(Password_resets,query,dataToUpdate);
    return  res.success({ data :updatedPassword_resets }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Password_resets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Password_resetss.
 * @return {Object} : updated Password_resetss. {status, message, data}
 */
const bulkUpdatePassword_resets = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPassword_resets = await dbService.update(Password_resets,filter,dataToUpdate);
    if (!updatedPassword_resets){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPassword_resets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Password_resets with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Password_resets.
 * @return {Object} : updated Password_resets. {status, message, data}
 */
const partialUpdatePassword_resets = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      password_resetsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPassword_resets = await dbService.update(Password_resets, query, dataToUpdate);
    if (!updatedPassword_resets) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPassword_resets });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Password_resets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Password_resets.
 * @return {Object} : deactivated Password_resets. {status, message, data}
 */
const softDeletePassword_resets = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Password_resets, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Password_resets from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Password_resets. {status, message, data}
 */
const deletePassword_resets = async (req, res) => {
  const result = await dbService.deleteByPk(Password_resets, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Password_resets in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPassword_resets = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPassword_resets = await dbService.destroy(Password_resets,query);
    return res.success({ data :{ count :deletedPassword_resets.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Password_resets from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Password_resets.
 * @return {Object} : number of deactivated documents of Password_resets. {status, message, data}
 */
const softDeleteManyPassword_resets = async (req, res) => {
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
    let updatedPassword_resets = await dbService.update(Password_resets,query,updateBody, options);
    if (!updatedPassword_resets) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPassword_resets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPassword_resets,
  bulkInsertPassword_resets,
  findAllPassword_resets,
  getPassword_resets,
  getPassword_resetsCount,
  updatePassword_resets,
  bulkUpdatePassword_resets,
  partialUpdatePassword_resets,
  softDeletePassword_resets,
  deletePassword_resets,
  deleteManyPassword_resets,
  softDeleteManyPassword_resets,
};
