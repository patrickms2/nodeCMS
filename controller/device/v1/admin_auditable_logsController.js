/**
 * admin_auditable_logsController.js
 * @description :: exports action methods for admin_auditable_logs.
 */

const Admin_auditable_logs = require('../../../model/admin_auditable_logs');
const admin_auditable_logsSchemaKey = require('../../../utils/validation/admin_auditable_logsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_auditable_logs in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_auditable_logs. {status, message, data}
 */ 
const addAdmin_auditable_logs = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_auditable_logsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_auditable_logs = await dbService.createOne(Admin_auditable_logs,dataToCreate);
    return  res.success({ data :createdAdmin_auditable_logs });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_auditable_logs in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_auditable_logss. {status, message, data}
 */
const bulkInsertAdmin_auditable_logs = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_auditable_logs = await dbService.createMany(Admin_auditable_logs,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_auditable_logs.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_auditable_logs from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_auditable_logs(s). {status, message, data}
 */
const findAllAdmin_auditable_logs = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_auditable_logs;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_auditable_logsSchemaKey.findFilterKeys,
      Admin_auditable_logs.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_auditable_logs = await dbService.count(Admin_auditable_logs, query);
      if (!foundAdmin_auditable_logs) {
        return res.recordNotFound();
      } 
      foundAdmin_auditable_logs = { totalRecords: foundAdmin_auditable_logs };
      return res.success({ data :foundAdmin_auditable_logs });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_auditable_logs = await dbService.paginate( Admin_auditable_logs,query,options);
    if (!foundAdmin_auditable_logs){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_auditable_logs }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_auditable_logs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_auditable_logs. {status, message, data}
 */
const getAdmin_auditable_logs = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_auditable_logs = await dbService.findOne(Admin_auditable_logs,{ id :id });
    if (!foundAdmin_auditable_logs){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_auditable_logs });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_auditable_logs.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_auditable_logsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_auditable_logsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_auditable_logs = await dbService.count(Admin_auditable_logs,where);
    if (!countedAdmin_auditable_logs){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_auditable_logs } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_auditable_logs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_auditable_logs.
 * @return {Object} : updated Admin_auditable_logs. {status, message, data}
 */
const updateAdmin_auditable_logs = async (req, res) => {
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
      admin_auditable_logsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_auditable_logs = await dbService.update(Admin_auditable_logs,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_auditable_logs }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_auditable_logs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_auditable_logss.
 * @return {Object} : updated Admin_auditable_logss. {status, message, data}
 */
const bulkUpdateAdmin_auditable_logs = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_auditable_logs = await dbService.update(Admin_auditable_logs,filter,dataToUpdate);
    if (!updatedAdmin_auditable_logs){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_auditable_logs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_auditable_logs with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_auditable_logs.
 * @return {Object} : updated Admin_auditable_logs. {status, message, data}
 */
const partialUpdateAdmin_auditable_logs = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_auditable_logsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_auditable_logs = await dbService.update(Admin_auditable_logs, query, dataToUpdate);
    if (!updatedAdmin_auditable_logs) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_auditable_logs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_auditable_logs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_auditable_logs.
 * @return {Object} : deactivated Admin_auditable_logs. {status, message, data}
 */
const softDeleteAdmin_auditable_logs = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_auditable_logs, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_auditable_logs from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_auditable_logs. {status, message, data}
 */
const deleteAdmin_auditable_logs = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_auditable_logs, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_auditable_logs in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_auditable_logs = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_auditable_logs = await dbService.destroy(Admin_auditable_logs,query);
    return res.success({ data :{ count :deletedAdmin_auditable_logs.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_auditable_logs from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_auditable_logs.
 * @return {Object} : number of deactivated documents of Admin_auditable_logs. {status, message, data}
 */
const softDeleteManyAdmin_auditable_logs = async (req, res) => {
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
    let updatedAdmin_auditable_logs = await dbService.update(Admin_auditable_logs,query,updateBody, options);
    if (!updatedAdmin_auditable_logs) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_auditable_logs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_auditable_logs,
  bulkInsertAdmin_auditable_logs,
  findAllAdmin_auditable_logs,
  getAdmin_auditable_logs,
  getAdmin_auditable_logsCount,
  updateAdmin_auditable_logs,
  bulkUpdateAdmin_auditable_logs,
  partialUpdateAdmin_auditable_logs,
  softDeleteAdmin_auditable_logs,
  deleteAdmin_auditable_logs,
  deleteManyAdmin_auditable_logs,
  softDeleteManyAdmin_auditable_logs,
};
