/**
 * admin_usersController.js
 * @description :: exports action methods for admin_users.
 */

const Admin_users = require('../../../model/admin_users');
const admin_usersSchemaKey = require('../../../utils/validation/admin_usersValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_users in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_users. {status, message, data}
 */ 
const addAdmin_users = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_usersSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_users = await dbService.createOne(Admin_users,dataToCreate);
    return  res.success({ data :createdAdmin_users });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_users in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_userss. {status, message, data}
 */
const bulkInsertAdmin_users = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_users = await dbService.createMany(Admin_users,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_users.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_users from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_users(s). {status, message, data}
 */
const findAllAdmin_users = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_users;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_usersSchemaKey.findFilterKeys,
      Admin_users.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_users = await dbService.count(Admin_users, query);
      if (!foundAdmin_users) {
        return res.recordNotFound();
      } 
      foundAdmin_users = { totalRecords: foundAdmin_users };
      return res.success({ data :foundAdmin_users });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_users = await dbService.paginate( Admin_users,query,options);
    if (!foundAdmin_users){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_users }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_users from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_users. {status, message, data}
 */
const getAdmin_users = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_users = await dbService.findOne(Admin_users,{ id :id });
    if (!foundAdmin_users){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_users });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_users.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_usersCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_usersSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_users = await dbService.count(Admin_users,where);
    if (!countedAdmin_users){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_users } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_users with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_users.
 * @return {Object} : updated Admin_users. {status, message, data}
 */
const updateAdmin_users = async (req, res) => {
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
      admin_usersSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_users = await dbService.update(Admin_users,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_users }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_users with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_userss.
 * @return {Object} : updated Admin_userss. {status, message, data}
 */
const bulkUpdateAdmin_users = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_users = await dbService.update(Admin_users,filter,dataToUpdate);
    if (!updatedAdmin_users){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_users.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_users with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_users.
 * @return {Object} : updated Admin_users. {status, message, data}
 */
const partialUpdateAdmin_users = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_usersSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_users = await dbService.update(Admin_users, query, dataToUpdate);
    if (!updatedAdmin_users) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_users });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_users from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_users.
 * @return {Object} : deactivated Admin_users. {status, message, data}
 */
const softDeleteAdmin_users = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_users, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_users from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_users. {status, message, data}
 */
const deleteAdmin_users = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_users, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_users in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_users = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_users = await dbService.destroy(Admin_users,query);
    return res.success({ data :{ count :deletedAdmin_users.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_users from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_users.
 * @return {Object} : number of deactivated documents of Admin_users. {status, message, data}
 */
const softDeleteManyAdmin_users = async (req, res) => {
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
    let updatedAdmin_users = await dbService.update(Admin_users,query,updateBody, options);
    if (!updatedAdmin_users) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_users.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_users,
  bulkInsertAdmin_users,
  findAllAdmin_users,
  getAdmin_users,
  getAdmin_usersCount,
  updateAdmin_users,
  bulkUpdateAdmin_users,
  partialUpdateAdmin_users,
  softDeleteAdmin_users,
  deleteAdmin_users,
  deleteManyAdmin_users,
  softDeleteManyAdmin_users,
};
