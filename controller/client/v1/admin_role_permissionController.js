/**
 * admin_role_permissionController.js
 * @description :: exports action methods for admin_role_permission.
 */

const Admin_role_permission = require('../../../model/admin_role_permission');
const admin_role_permissionSchemaKey = require('../../../utils/validation/admin_role_permissionValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_role_permission in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_role_permission. {status, message, data}
 */ 
const addAdmin_role_permission = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_role_permissionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_role_permission = await dbService.createOne(Admin_role_permission,dataToCreate);
    return  res.success({ data :createdAdmin_role_permission });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_role_permission in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_role_permissions. {status, message, data}
 */
const bulkInsertAdmin_role_permission = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_role_permission = await dbService.createMany(Admin_role_permission,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_role_permission.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_role_permission from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_role_permission(s). {status, message, data}
 */
const findAllAdmin_role_permission = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_role_permission;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_role_permissionSchemaKey.findFilterKeys,
      Admin_role_permission.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_role_permission = await dbService.count(Admin_role_permission, query);
      if (!foundAdmin_role_permission) {
        return res.recordNotFound();
      } 
      foundAdmin_role_permission = { totalRecords: foundAdmin_role_permission };
      return res.success({ data :foundAdmin_role_permission });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_role_permission = await dbService.paginate( Admin_role_permission,query,options);
    if (!foundAdmin_role_permission){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_role_permission }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_role_permission from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_role_permission. {status, message, data}
 */
const getAdmin_role_permission = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_role_permission = await dbService.findOne(Admin_role_permission,{ id :id });
    if (!foundAdmin_role_permission){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_role_permission });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_role_permission.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_role_permissionCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_role_permissionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_role_permission = await dbService.count(Admin_role_permission,where);
    if (!countedAdmin_role_permission){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_role_permission } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_role_permission with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_role_permission.
 * @return {Object} : updated Admin_role_permission. {status, message, data}
 */
const updateAdmin_role_permission = async (req, res) => {
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
      admin_role_permissionSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_role_permission = await dbService.update(Admin_role_permission,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_role_permission }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_role_permission with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_role_permissions.
 * @return {Object} : updated Admin_role_permissions. {status, message, data}
 */
const bulkUpdateAdmin_role_permission = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_role_permission = await dbService.update(Admin_role_permission,filter,dataToUpdate);
    if (!updatedAdmin_role_permission){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_role_permission.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_role_permission with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_role_permission.
 * @return {Object} : updated Admin_role_permission. {status, message, data}
 */
const partialUpdateAdmin_role_permission = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_role_permissionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_role_permission = await dbService.update(Admin_role_permission, query, dataToUpdate);
    if (!updatedAdmin_role_permission) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_role_permission });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_role_permission from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_role_permission.
 * @return {Object} : deactivated Admin_role_permission. {status, message, data}
 */
const softDeleteAdmin_role_permission = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_role_permission, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_role_permission from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_role_permission. {status, message, data}
 */
const deleteAdmin_role_permission = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_role_permission, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_role_permission in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_role_permission = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_role_permission = await dbService.destroy(Admin_role_permission,query);
    return res.success({ data :{ count :deletedAdmin_role_permission.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_role_permission from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_role_permission.
 * @return {Object} : number of deactivated documents of Admin_role_permission. {status, message, data}
 */
const softDeleteManyAdmin_role_permission = async (req, res) => {
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
    let updatedAdmin_role_permission = await dbService.update(Admin_role_permission,query,updateBody, options);
    if (!updatedAdmin_role_permission) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_role_permission.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_role_permission,
  bulkInsertAdmin_role_permission,
  findAllAdmin_role_permission,
  getAdmin_role_permission,
  getAdmin_role_permissionCount,
  updateAdmin_role_permission,
  bulkUpdateAdmin_role_permission,
  partialUpdateAdmin_role_permission,
  softDeleteAdmin_role_permission,
  deleteAdmin_role_permission,
  deleteManyAdmin_role_permission,
  softDeleteManyAdmin_role_permission,
};
