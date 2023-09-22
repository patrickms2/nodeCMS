/**
 * rolesController.js
 * @description :: exports action methods for roles.
 */

const Roles = require('../../../model/roles');
const rolesSchemaKey = require('../../../utils/validation/rolesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Roles in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Roles. {status, message, data}
 */ 
const addRoles = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      rolesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdRoles = await dbService.createOne(Roles,dataToCreate);
    return  res.success({ data :createdRoles });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Roles in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Roless. {status, message, data}
 */
const bulkInsertRoles = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdRoles = await dbService.createMany(Roles,dataToCreate); 
      return  res.success({ data :{ count :createdRoles.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Roles from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Roles(s). {status, message, data}
 */
const findAllRoles = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundRoles;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      rolesSchemaKey.findFilterKeys,
      Roles.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundRoles = await dbService.count(Roles, query);
      if (!foundRoles) {
        return res.recordNotFound();
      } 
      foundRoles = { totalRecords: foundRoles };
      return res.success({ data :foundRoles });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundRoles = await dbService.paginate( Roles,query,options);
    if (!foundRoles){
      return res.recordNotFound();
    }
    return res.success({ data:foundRoles }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Roles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Roles. {status, message, data}
 */
const getRoles = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundRoles = await dbService.findOne(Roles,{ id :id });
    if (!foundRoles){
      return res.recordNotFound();
    }
    return  res.success({ data :foundRoles });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Roles.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getRolesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      rolesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedRoles = await dbService.count(Roles,where);
    if (!countedRoles){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedRoles } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Roles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Roles.
 * @return {Object} : updated Roles. {status, message, data}
 */
const updateRoles = async (req, res) => {
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
      rolesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedRoles = await dbService.update(Roles,query,dataToUpdate);
    return  res.success({ data :updatedRoles }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Roles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Roless.
 * @return {Object} : updated Roless. {status, message, data}
 */
const bulkUpdateRoles = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedRoles = await dbService.update(Roles,filter,dataToUpdate);
    if (!updatedRoles){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedRoles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Roles with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Roles.
 * @return {Object} : updated Roles. {status, message, data}
 */
const partialUpdateRoles = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      rolesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedRoles = await dbService.update(Roles, query, dataToUpdate);
    if (!updatedRoles) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedRoles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Roles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Roles.
 * @return {Object} : deactivated Roles. {status, message, data}
 */
const softDeleteRoles = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Roles, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Roles from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Roles. {status, message, data}
 */
const deleteRoles = async (req, res) => {
  const result = await dbService.deleteByPk(Roles, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Roles in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyRoles = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedRoles = await dbService.destroy(Roles,query);
    return res.success({ data :{ count :deletedRoles.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Roles from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Roles.
 * @return {Object} : number of deactivated documents of Roles. {status, message, data}
 */
const softDeleteManyRoles = async (req, res) => {
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
    let updatedRoles = await dbService.update(Roles,query,updateBody, options);
    if (!updatedRoles) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedRoles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addRoles,
  bulkInsertRoles,
  findAllRoles,
  getRoles,
  getRolesCount,
  updateRoles,
  bulkUpdateRoles,
  partialUpdateRoles,
  softDeleteRoles,
  deleteRoles,
  deleteManyRoles,
  softDeleteManyRoles,
};
