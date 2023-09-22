/**
 * admin_permissionsController.js
 * @description :: exports action methods for admin_permissions.
 */

const Admin_permissions = require('../../../model/admin_permissions');
const admin_permissionsSchemaKey = require('../../../utils/validation/admin_permissionsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_permissions in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_permissions. {status, message, data}
 */ 
const addAdmin_permissions = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_permissionsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_permissions = await dbService.createOne(Admin_permissions,dataToCreate);
    return  res.success({ data :createdAdmin_permissions });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_permissions in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_permissionss. {status, message, data}
 */
const bulkInsertAdmin_permissions = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_permissions = await dbService.createMany(Admin_permissions,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_permissions.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_permissions from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_permissions(s). {status, message, data}
 */
const findAllAdmin_permissions = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_permissions;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_permissionsSchemaKey.findFilterKeys,
      Admin_permissions.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_permissions = await dbService.count(Admin_permissions, query);
      if (!foundAdmin_permissions) {
        return res.recordNotFound();
      } 
      foundAdmin_permissions = { totalRecords: foundAdmin_permissions };
      return res.success({ data :foundAdmin_permissions });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_permissions = await dbService.paginate( Admin_permissions,query,options);
    if (!foundAdmin_permissions){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_permissions }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_permissions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_permissions. {status, message, data}
 */
const getAdmin_permissions = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_permissions = await dbService.findOne(Admin_permissions,{ id :id });
    if (!foundAdmin_permissions){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_permissions });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_permissions.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_permissionsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_permissionsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_permissions = await dbService.count(Admin_permissions,where);
    if (!countedAdmin_permissions){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_permissions } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_permissions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_permissions.
 * @return {Object} : updated Admin_permissions. {status, message, data}
 */
const updateAdmin_permissions = async (req, res) => {
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
      admin_permissionsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_permissions = await dbService.update(Admin_permissions,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_permissions }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_permissions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_permissionss.
 * @return {Object} : updated Admin_permissionss. {status, message, data}
 */
const bulkUpdateAdmin_permissions = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_permissions = await dbService.update(Admin_permissions,filter,dataToUpdate);
    if (!updatedAdmin_permissions){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_permissions.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_permissions with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_permissions.
 * @return {Object} : updated Admin_permissions. {status, message, data}
 */
const partialUpdateAdmin_permissions = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_permissionsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_permissions = await dbService.update(Admin_permissions, query, dataToUpdate);
    if (!updatedAdmin_permissions) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_permissions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_permissions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_permissions.
 * @return {Object} : deactivated Admin_permissions. {status, message, data}
 */
const softDeleteAdmin_permissions = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_permissions, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_permissions from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_permissions. {status, message, data}
 */
const deleteAdmin_permissions = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_permissions, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_permissions in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_permissions = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_permissions = await dbService.destroy(Admin_permissions,query);
    return res.success({ data :{ count :deletedAdmin_permissions.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_permissions from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_permissions.
 * @return {Object} : number of deactivated documents of Admin_permissions. {status, message, data}
 */
const softDeleteManyAdmin_permissions = async (req, res) => {
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
    let updatedAdmin_permissions = await dbService.update(Admin_permissions,query,updateBody, options);
    if (!updatedAdmin_permissions) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_permissions.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_permissions,
  bulkInsertAdmin_permissions,
  findAllAdmin_permissions,
  getAdmin_permissions,
  getAdmin_permissionsCount,
  updateAdmin_permissions,
  bulkUpdateAdmin_permissions,
  partialUpdateAdmin_permissions,
  softDeleteAdmin_permissions,
  deleteAdmin_permissions,
  deleteManyAdmin_permissions,
  softDeleteManyAdmin_permissions,
};
