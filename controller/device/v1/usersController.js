/**
 * usersController.js
 * @description :: exports action methods for users.
 */

const Users = require('../../../model/users');
const usersSchemaKey = require('../../../utils/validation/usersValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Users in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Users. {status, message, data}
 */ 
const addUsers = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      usersSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdUsers = await dbService.createOne(Users,dataToCreate);
    return  res.success({ data :createdUsers });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Users in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Userss. {status, message, data}
 */
const bulkInsertUsers = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdUsers = await dbService.createMany(Users,dataToCreate); 
      return  res.success({ data :{ count :createdUsers.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Users from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Users(s). {status, message, data}
 */
const findAllUsers = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUsers;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      usersSchemaKey.findFilterKeys,
      Users.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundUsers = await dbService.count(Users, query);
      if (!foundUsers) {
        return res.recordNotFound();
      } 
      foundUsers = { totalRecords: foundUsers };
      return res.success({ data :foundUsers });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundUsers = await dbService.paginate( Users,query,options);
    if (!foundUsers){
      return res.recordNotFound();
    }
    return res.success({ data:foundUsers }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Users from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Users. {status, message, data}
 */
const getUsers = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundUsers = await dbService.findOne(Users,{ id :id });
    if (!foundUsers){
      return res.recordNotFound();
    }
    return  res.success({ data :foundUsers });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Users.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getUsersCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      usersSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedUsers = await dbService.count(Users,where);
    if (!countedUsers){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedUsers } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Users with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Users.
 * @return {Object} : updated Users. {status, message, data}
 */
const updateUsers = async (req, res) => {
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
      usersSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedUsers = await dbService.update(Users,query,dataToUpdate);
    return  res.success({ data :updatedUsers }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Users with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Userss.
 * @return {Object} : updated Userss. {status, message, data}
 */
const bulkUpdateUsers = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedUsers = await dbService.update(Users,filter,dataToUpdate);
    if (!updatedUsers){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedUsers.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Users with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Users.
 * @return {Object} : updated Users. {status, message, data}
 */
const partialUpdateUsers = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      usersSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedUsers = await dbService.update(Users, query, dataToUpdate);
    if (!updatedUsers) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedUsers });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Users from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Users.
 * @return {Object} : deactivated Users. {status, message, data}
 */
const softDeleteUsers = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Users, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Users from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Users. {status, message, data}
 */
const deleteUsers = async (req, res) => {
  const result = await dbService.deleteByPk(Users, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Users in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyUsers = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedUsers = await dbService.destroy(Users,query);
    return res.success({ data :{ count :deletedUsers.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Users from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Users.
 * @return {Object} : number of deactivated documents of Users. {status, message, data}
 */
const softDeleteManyUsers = async (req, res) => {
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
    let updatedUsers = await dbService.update(Users,query,updateBody, options);
    if (!updatedUsers) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedUsers.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addUsers,
  bulkInsertUsers,
  findAllUsers,
  getUsers,
  getUsersCount,
  updateUsers,
  bulkUpdateUsers,
  partialUpdateUsers,
  softDeleteUsers,
  deleteUsers,
  deleteManyUsers,
  softDeleteManyUsers,
};
