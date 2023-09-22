/**
 * admin_teamsController.js
 * @description :: exports action methods for admin_teams.
 */

const Admin_teams = require('../../../model/admin_teams');
const admin_teamsSchemaKey = require('../../../utils/validation/admin_teamsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Admin_teams in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Admin_teams. {status, message, data}
 */ 
const addAdmin_teams = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      admin_teamsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAdmin_teams = await dbService.createOne(Admin_teams,dataToCreate);
    return  res.success({ data :createdAdmin_teams });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Admin_teams in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Admin_teamss. {status, message, data}
 */
const bulkInsertAdmin_teams = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAdmin_teams = await dbService.createMany(Admin_teams,dataToCreate); 
      return  res.success({ data :{ count :createdAdmin_teams.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Admin_teams from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Admin_teams(s). {status, message, data}
 */
const findAllAdmin_teams = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAdmin_teams;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      admin_teamsSchemaKey.findFilterKeys,
      Admin_teams.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAdmin_teams = await dbService.count(Admin_teams, query);
      if (!foundAdmin_teams) {
        return res.recordNotFound();
      } 
      foundAdmin_teams = { totalRecords: foundAdmin_teams };
      return res.success({ data :foundAdmin_teams });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAdmin_teams = await dbService.paginate( Admin_teams,query,options);
    if (!foundAdmin_teams){
      return res.recordNotFound();
    }
    return res.success({ data:foundAdmin_teams }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Admin_teams from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Admin_teams. {status, message, data}
 */
const getAdmin_teams = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAdmin_teams = await dbService.findOne(Admin_teams,{ id :id });
    if (!foundAdmin_teams){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAdmin_teams });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Admin_teams.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAdmin_teamsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      admin_teamsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAdmin_teams = await dbService.count(Admin_teams,where);
    if (!countedAdmin_teams){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAdmin_teams } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Admin_teams with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_teams.
 * @return {Object} : updated Admin_teams. {status, message, data}
 */
const updateAdmin_teams = async (req, res) => {
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
      admin_teamsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAdmin_teams = await dbService.update(Admin_teams,query,dataToUpdate);
    return  res.success({ data :updatedAdmin_teams }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Admin_teams with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_teamss.
 * @return {Object} : updated Admin_teamss. {status, message, data}
 */
const bulkUpdateAdmin_teams = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAdmin_teams = await dbService.update(Admin_teams,filter,dataToUpdate);
    if (!updatedAdmin_teams){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAdmin_teams.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Admin_teams with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Admin_teams.
 * @return {Object} : updated Admin_teams. {status, message, data}
 */
const partialUpdateAdmin_teams = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      admin_teamsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAdmin_teams = await dbService.update(Admin_teams, query, dataToUpdate);
    if (!updatedAdmin_teams) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAdmin_teams });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Admin_teams from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Admin_teams.
 * @return {Object} : deactivated Admin_teams. {status, message, data}
 */
const softDeleteAdmin_teams = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Admin_teams, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Admin_teams from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Admin_teams. {status, message, data}
 */
const deleteAdmin_teams = async (req, res) => {
  const result = await dbService.deleteByPk(Admin_teams, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Admin_teams in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAdmin_teams = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAdmin_teams = await dbService.destroy(Admin_teams,query);
    return res.success({ data :{ count :deletedAdmin_teams.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Admin_teams from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Admin_teams.
 * @return {Object} : number of deactivated documents of Admin_teams. {status, message, data}
 */
const softDeleteManyAdmin_teams = async (req, res) => {
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
    let updatedAdmin_teams = await dbService.update(Admin_teams,query,updateBody, options);
    if (!updatedAdmin_teams) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAdmin_teams.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAdmin_teams,
  bulkInsertAdmin_teams,
  findAllAdmin_teams,
  getAdmin_teams,
  getAdmin_teamsCount,
  updateAdmin_teams,
  bulkUpdateAdmin_teams,
  partialUpdateAdmin_teams,
  softDeleteAdmin_teams,
  deleteAdmin_teams,
  deleteManyAdmin_teams,
  softDeleteManyAdmin_teams,
};
