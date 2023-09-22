/**
 * pagebuilder__settingsController.js
 * @description :: exports action methods for pagebuilder__settings.
 */

const Pagebuilder__settings = require('../../../model/pagebuilder__settings');
const pagebuilder__settingsSchemaKey = require('../../../utils/validation/pagebuilder__settingsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Pagebuilder__settings in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Pagebuilder__settings. {status, message, data}
 */ 
const addPagebuilder__settings = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      pagebuilder__settingsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPagebuilder__settings = await dbService.createOne(Pagebuilder__settings,dataToCreate);
    return  res.success({ data :createdPagebuilder__settings });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Pagebuilder__settings in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Pagebuilder__settingss. {status, message, data}
 */
const bulkInsertPagebuilder__settings = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPagebuilder__settings = await dbService.createMany(Pagebuilder__settings,dataToCreate); 
      return  res.success({ data :{ count :createdPagebuilder__settings.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Pagebuilder__settings from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Pagebuilder__settings(s). {status, message, data}
 */
const findAllPagebuilder__settings = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPagebuilder__settings;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      pagebuilder__settingsSchemaKey.findFilterKeys,
      Pagebuilder__settings.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPagebuilder__settings = await dbService.count(Pagebuilder__settings, query);
      if (!foundPagebuilder__settings) {
        return res.recordNotFound();
      } 
      foundPagebuilder__settings = { totalRecords: foundPagebuilder__settings };
      return res.success({ data :foundPagebuilder__settings });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPagebuilder__settings = await dbService.paginate( Pagebuilder__settings,query,options);
    if (!foundPagebuilder__settings){
      return res.recordNotFound();
    }
    return res.success({ data:foundPagebuilder__settings }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Pagebuilder__settings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Pagebuilder__settings. {status, message, data}
 */
const getPagebuilder__settings = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPagebuilder__settings = await dbService.findOne(Pagebuilder__settings,{ id :id });
    if (!foundPagebuilder__settings){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPagebuilder__settings });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Pagebuilder__settings.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPagebuilder__settingsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      pagebuilder__settingsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPagebuilder__settings = await dbService.count(Pagebuilder__settings,where);
    if (!countedPagebuilder__settings){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPagebuilder__settings } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Pagebuilder__settings with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__settings.
 * @return {Object} : updated Pagebuilder__settings. {status, message, data}
 */
const updatePagebuilder__settings = async (req, res) => {
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
      pagebuilder__settingsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPagebuilder__settings = await dbService.update(Pagebuilder__settings,query,dataToUpdate);
    return  res.success({ data :updatedPagebuilder__settings }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Pagebuilder__settings with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__settingss.
 * @return {Object} : updated Pagebuilder__settingss. {status, message, data}
 */
const bulkUpdatePagebuilder__settings = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPagebuilder__settings = await dbService.update(Pagebuilder__settings,filter,dataToUpdate);
    if (!updatedPagebuilder__settings){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPagebuilder__settings.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Pagebuilder__settings with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__settings.
 * @return {Object} : updated Pagebuilder__settings. {status, message, data}
 */
const partialUpdatePagebuilder__settings = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      pagebuilder__settingsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPagebuilder__settings = await dbService.update(Pagebuilder__settings, query, dataToUpdate);
    if (!updatedPagebuilder__settings) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPagebuilder__settings });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Pagebuilder__settings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Pagebuilder__settings.
 * @return {Object} : deactivated Pagebuilder__settings. {status, message, data}
 */
const softDeletePagebuilder__settings = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Pagebuilder__settings, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Pagebuilder__settings from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Pagebuilder__settings. {status, message, data}
 */
const deletePagebuilder__settings = async (req, res) => {
  const result = await dbService.deleteByPk(Pagebuilder__settings, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Pagebuilder__settings in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPagebuilder__settings = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPagebuilder__settings = await dbService.destroy(Pagebuilder__settings,query);
    return res.success({ data :{ count :deletedPagebuilder__settings.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Pagebuilder__settings from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Pagebuilder__settings.
 * @return {Object} : number of deactivated documents of Pagebuilder__settings. {status, message, data}
 */
const softDeleteManyPagebuilder__settings = async (req, res) => {
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
    let updatedPagebuilder__settings = await dbService.update(Pagebuilder__settings,query,updateBody, options);
    if (!updatedPagebuilder__settings) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPagebuilder__settings.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPagebuilder__settings,
  bulkInsertPagebuilder__settings,
  findAllPagebuilder__settings,
  getPagebuilder__settings,
  getPagebuilder__settingsCount,
  updatePagebuilder__settings,
  bulkUpdatePagebuilder__settings,
  partialUpdatePagebuilder__settings,
  softDeletePagebuilder__settings,
  deletePagebuilder__settings,
  deleteManyPagebuilder__settings,
  softDeleteManyPagebuilder__settings,
};
