/**
 * gestin_de_contenidos_paneController.js
 * @description :: exports action methods for gestin_de_contenidos_pane.
 */

const Gestin_de_contenidos_pane = require('../../../model/gestin_de_contenidos_pane');
const gestin_de_contenidos_paneSchemaKey = require('../../../utils/validation/gestin_de_contenidos_paneValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Gestin_de_contenidos_pane in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Gestin_de_contenidos_pane. {status, message, data}
 */ 
const addGestin_de_contenidos_pane = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      gestin_de_contenidos_paneSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdGestin_de_contenidos_pane = await dbService.createOne(Gestin_de_contenidos_pane,dataToCreate);
    return  res.success({ data :createdGestin_de_contenidos_pane });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Gestin_de_contenidos_pane in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Gestin_de_contenidos_panes. {status, message, data}
 */
const bulkInsertGestin_de_contenidos_pane = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdGestin_de_contenidos_pane = await dbService.createMany(Gestin_de_contenidos_pane,dataToCreate); 
      return  res.success({ data :{ count :createdGestin_de_contenidos_pane.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Gestin_de_contenidos_pane from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Gestin_de_contenidos_pane(s). {status, message, data}
 */
const findAllGestin_de_contenidos_pane = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundGestin_de_contenidos_pane;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      gestin_de_contenidos_paneSchemaKey.findFilterKeys,
      Gestin_de_contenidos_pane.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundGestin_de_contenidos_pane = await dbService.count(Gestin_de_contenidos_pane, query);
      if (!foundGestin_de_contenidos_pane) {
        return res.recordNotFound();
      } 
      foundGestin_de_contenidos_pane = { totalRecords: foundGestin_de_contenidos_pane };
      return res.success({ data :foundGestin_de_contenidos_pane });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundGestin_de_contenidos_pane = await dbService.paginate( Gestin_de_contenidos_pane,query,options);
    if (!foundGestin_de_contenidos_pane){
      return res.recordNotFound();
    }
    return res.success({ data:foundGestin_de_contenidos_pane }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Gestin_de_contenidos_pane from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Gestin_de_contenidos_pane. {status, message, data}
 */
const getGestin_de_contenidos_pane = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundGestin_de_contenidos_pane = await dbService.findOne(Gestin_de_contenidos_pane,{ id :id });
    if (!foundGestin_de_contenidos_pane){
      return res.recordNotFound();
    }
    return  res.success({ data :foundGestin_de_contenidos_pane });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Gestin_de_contenidos_pane.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getGestin_de_contenidos_paneCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      gestin_de_contenidos_paneSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedGestin_de_contenidos_pane = await dbService.count(Gestin_de_contenidos_pane,where);
    if (!countedGestin_de_contenidos_pane){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedGestin_de_contenidos_pane } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Gestin_de_contenidos_pane with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Gestin_de_contenidos_pane.
 * @return {Object} : updated Gestin_de_contenidos_pane. {status, message, data}
 */
const updateGestin_de_contenidos_pane = async (req, res) => {
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
      gestin_de_contenidos_paneSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedGestin_de_contenidos_pane = await dbService.update(Gestin_de_contenidos_pane,query,dataToUpdate);
    return  res.success({ data :updatedGestin_de_contenidos_pane }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Gestin_de_contenidos_pane with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Gestin_de_contenidos_panes.
 * @return {Object} : updated Gestin_de_contenidos_panes. {status, message, data}
 */
const bulkUpdateGestin_de_contenidos_pane = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedGestin_de_contenidos_pane = await dbService.update(Gestin_de_contenidos_pane,filter,dataToUpdate);
    if (!updatedGestin_de_contenidos_pane){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedGestin_de_contenidos_pane.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Gestin_de_contenidos_pane with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Gestin_de_contenidos_pane.
 * @return {Object} : updated Gestin_de_contenidos_pane. {status, message, data}
 */
const partialUpdateGestin_de_contenidos_pane = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      gestin_de_contenidos_paneSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedGestin_de_contenidos_pane = await dbService.update(Gestin_de_contenidos_pane, query, dataToUpdate);
    if (!updatedGestin_de_contenidos_pane) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedGestin_de_contenidos_pane });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Gestin_de_contenidos_pane from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Gestin_de_contenidos_pane.
 * @return {Object} : deactivated Gestin_de_contenidos_pane. {status, message, data}
 */
const softDeleteGestin_de_contenidos_pane = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Gestin_de_contenidos_pane, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Gestin_de_contenidos_pane from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Gestin_de_contenidos_pane. {status, message, data}
 */
const deleteGestin_de_contenidos_pane = async (req, res) => {
  const result = await dbService.deleteByPk(Gestin_de_contenidos_pane, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Gestin_de_contenidos_pane in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyGestin_de_contenidos_pane = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedGestin_de_contenidos_pane = await dbService.destroy(Gestin_de_contenidos_pane,query);
    return res.success({ data :{ count :deletedGestin_de_contenidos_pane.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Gestin_de_contenidos_pane from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Gestin_de_contenidos_pane.
 * @return {Object} : number of deactivated documents of Gestin_de_contenidos_pane. {status, message, data}
 */
const softDeleteManyGestin_de_contenidos_pane = async (req, res) => {
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
    let updatedGestin_de_contenidos_pane = await dbService.update(Gestin_de_contenidos_pane,query,updateBody, options);
    if (!updatedGestin_de_contenidos_pane) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedGestin_de_contenidos_pane.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addGestin_de_contenidos_pane,
  bulkInsertGestin_de_contenidos_pane,
  findAllGestin_de_contenidos_pane,
  getGestin_de_contenidos_pane,
  getGestin_de_contenidos_paneCount,
  updateGestin_de_contenidos_pane,
  bulkUpdateGestin_de_contenidos_pane,
  partialUpdateGestin_de_contenidos_pane,
  softDeleteGestin_de_contenidos_pane,
  deleteGestin_de_contenidos_pane,
  deleteManyGestin_de_contenidos_pane,
  softDeleteManyGestin_de_contenidos_pane,
};
