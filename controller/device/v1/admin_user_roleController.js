/**
 * admin_user_roleController.js
 * @description :: exports action methods for admin_user_role.
 */

const Admin_user_role = require('../../../model/admin_user_role');
const admin_user_roleSchemaKey = require('../../../utils/validation/admin_user_roleValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_user_role in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_user_role. {status, message, data}
 */ 
const addAdmin_user_role = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_user_roleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_user_role = await dbService.createOne(Admin_user_role,dataToCreate);
    return  res.success({ data :createdAdmin_user_role });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_user_role in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_user_roles. {status, message, data}
 */
const bulkInsertAdmin_user_role = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_user_role = await dbService.createMany(Admin_user_role,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_user_role.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_user_role from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_user_role(s). {status, message, data}
 */
const findAllAdmin_user_role = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_user_role;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_user_roleSchemaKey.findFilterKeys,
      Admin_user_role.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_user_role = await dbService.count(Admin_user_role, query);
      if (!foundAdmin_user_role) {
        return res.recordNotFound();
      } 
      foundAdmin_user_role = { totalRecords: foundAdmin_user_role };
      return res.success({ data :foundAdmin_user_role });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_user_role = await dbService.paginate( Admin_user_role,query,options);
    if (!foundAdmin_user_role){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_user_role }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_user_role from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_user_role. {status, message, data}
 */
const getAdmin_user_role = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_user_role = await dbService.findOne(Admin_user_role,{ id :id });
    if (!foundAdmin_user_role){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_user_role });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_user_role.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_user_roleCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_user_roleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_user_role = await dbService.count(Admin_user_role,where);
    if (!countedAdmin_user_role){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_user_role } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_user_role with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_user_role.
 * @return {Object} : updated Admin_user_role. {status, message, data}
 */
const updateAdmin_user_role = async (req, res) => {
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
      admin_user_roleSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_user_role = await dbService.update(Admin_user_role,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_user_role }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_user_role with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_user_roles.
 * @return {Object} : updated Admin_user_roles. {status, message, data}
 */
const bulkUpdateAdmin_user_role = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_user_role = await dbService.update(Admin_user_role,filter,dataToUpdate);
    if (!updatedAdmin_user_role){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_user_role.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_user_role with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_user_role.
 * @return {Object} : updated Admin_user_role. {status, message, data}
 */
const partialUpdateAdmin_user_role = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_user_roleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_user_role = await dbService.update(Admin_user_role, query, dataToUpdate);
    if (!updatedAdmin_user_role) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_user_role });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_user_role from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_user_role.
 * @return {Object} : deactivated Admin_user_role. {status, message, data}
 */
const softDeleteAdmin_user_role = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_user_role, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_user_role from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_user_role. {status, message, data}
 */
const deleteAdmin_user_role = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_user_role, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_user_role in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_user_role = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_user_role = await dbService.destroy(Admin_user_role,query);
    return res.success({ data :{ count :deletedAdmin_user_role.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_user_role from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_user_role.
 * @return {Object} : number of deactivated documents of Admin_user_role. {status, message, data}
 */
const softDeleteManyAdmin_user_role = async (req, res) => {
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
    let updatedAdmin_user_role = await dbService.update(Admin_user_role,query,updateBody, options);
    if (!updatedAdmin_user_role) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_user_role.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_user_role,
  bulkInsertAdmin_user_role,
  findAllAdmin_user_role,
  getAdmin_user_role,
  getAdmin_user_roleCount,
  updateAdmin_user_role,
  bulkUpdateAdmin_user_role,
  partialUpdateAdmin_user_role,
  softDeleteAdmin_user_role,
  deleteAdmin_user_role,
  deleteManyAdmin_user_role,
  softDeleteManyAdmin_user_role,
};
