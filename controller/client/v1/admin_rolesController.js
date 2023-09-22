/**
 * admin_rolesController.js
 * @description :: exports action methods for admin_roles.
 */

const Admin_roles = require('../../../model/admin_roles');
const admin_rolesSchemaKey = require('../../../utils/validation/admin_rolesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_roles in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_roles. {status, message, data}
 */ 
const addAdmin_roles = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_rolesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_roles = await dbService.createOne(Admin_roles,dataToCreate);
    return  res.success({ data :createdAdmin_roles });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_roles in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_roless. {status, message, data}
 */
const bulkInsertAdmin_roles = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_roles = await dbService.createMany(Admin_roles,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_roles.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_roles from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_roles(s). {status, message, data}
 */
const findAllAdmin_roles = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_roles;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_rolesSchemaKey.findFilterKeys,
      Admin_roles.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_roles = await dbService.count(Admin_roles, query);
      if (!foundAdmin_roles) {
        return res.recordNotFound();
      } 
      foundAdmin_roles = { totalRecords: foundAdmin_roles };
      return res.success({ data :foundAdmin_roles });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_roles = await dbService.paginate( Admin_roles,query,options);
    if (!foundAdmin_roles){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_roles }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_roles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_roles. {status, message, data}
 */
const getAdmin_roles = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_roles = await dbService.findOne(Admin_roles,{ id :id });
    if (!foundAdmin_roles){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_roles });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_roles.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_rolesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_rolesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_roles = await dbService.count(Admin_roles,where);
    if (!countedAdmin_roles){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_roles } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_roles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_roles.
 * @return {Object} : updated Admin_roles. {status, message, data}
 */
const updateAdmin_roles = async (req, res) => {
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
      admin_rolesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_roles = await dbService.update(Admin_roles,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_roles }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_roles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_roless.
 * @return {Object} : updated Admin_roless. {status, message, data}
 */
const bulkUpdateAdmin_roles = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_roles = await dbService.update(Admin_roles,filter,dataToUpdate);
    if (!updatedAdmin_roles){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_roles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_roles with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_roles.
 * @return {Object} : updated Admin_roles. {status, message, data}
 */
const partialUpdateAdmin_roles = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_rolesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_roles = await dbService.update(Admin_roles, query, dataToUpdate);
    if (!updatedAdmin_roles) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_roles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_roles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_roles.
 * @return {Object} : deactivated Admin_roles. {status, message, data}
 */
const softDeleteAdmin_roles = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_roles, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_roles from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_roles. {status, message, data}
 */
const deleteAdmin_roles = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_roles, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_roles in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_roles = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_roles = await dbService.destroy(Admin_roles,query);
    return res.success({ data :{ count :deletedAdmin_roles.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_roles from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_roles.
 * @return {Object} : number of deactivated documents of Admin_roles. {status, message, data}
 */
const softDeleteManyAdmin_roles = async (req, res) => {
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
    let updatedAdmin_roles = await dbService.update(Admin_roles,query,updateBody, options);
    if (!updatedAdmin_roles) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_roles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_roles,
  bulkInsertAdmin_roles,
  findAllAdmin_roles,
  getAdmin_roles,
  getAdmin_rolesCount,
  updateAdmin_roles,
  bulkUpdateAdmin_roles,
  partialUpdateAdmin_roles,
  softDeleteAdmin_roles,
  deleteAdmin_roles,
  deleteManyAdmin_roles,
  softDeleteManyAdmin_roles,
};
