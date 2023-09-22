/**
 * obras_localizaciones_aController.js
 * @description :: exports action methods for obras_localizaciones_a.
 */

const Obras_localizaciones_a = require('../../../model/obras_localizaciones_a');
const obras_localizaciones_aSchemaKey = require('../../../utils/validation/obras_localizaciones_aValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Obras_localizaciones_a in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Obras_localizaciones_a. {status, message, data}
 */ 
const addObras_localizaciones_a = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      obras_localizaciones_aSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdObras_localizaciones_a = await dbService.createOne(Obras_localizaciones_a,dataToCreate);
    return  res.success({ data :createdObras_localizaciones_a });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Obras_localizaciones_a in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Obras_localizaciones_as. {status, message, data}
 */
const bulkInsertObras_localizaciones_a = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdObras_localizaciones_a = await dbService.createMany(Obras_localizaciones_a,dataToCreate); 
      return  res.success({ data :{ count :createdObras_localizaciones_a.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Obras_localizaciones_a from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Obras_localizaciones_a(s). {status, message, data}
 */
const findAllObras_localizaciones_a = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundObras_localizaciones_a;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      obras_localizaciones_aSchemaKey.findFilterKeys,
      Obras_localizaciones_a.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundObras_localizaciones_a = await dbService.count(Obras_localizaciones_a, query);
      if (!foundObras_localizaciones_a) {
        return res.recordNotFound();
      } 
      foundObras_localizaciones_a = { totalRecords: foundObras_localizaciones_a };
      return res.success({ data :foundObras_localizaciones_a });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundObras_localizaciones_a = await dbService.paginate( Obras_localizaciones_a,query,options);
    if (!foundObras_localizaciones_a){
      return res.recordNotFound();
    }
    return res.success({ data:foundObras_localizaciones_a }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Obras_localizaciones_a from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Obras_localizaciones_a. {status, message, data}
 */
const getObras_localizaciones_a = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundObras_localizaciones_a = await dbService.findOne(Obras_localizaciones_a,{ id :id });
    if (!foundObras_localizaciones_a){
      return res.recordNotFound();
    }
    return  res.success({ data :foundObras_localizaciones_a });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Obras_localizaciones_a.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getObras_localizaciones_aCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      obras_localizaciones_aSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedObras_localizaciones_a = await dbService.count(Obras_localizaciones_a,where);
    if (!countedObras_localizaciones_a){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedObras_localizaciones_a } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Obras_localizaciones_a with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_localizaciones_a.
 * @return {Object} : updated Obras_localizaciones_a. {status, message, data}
 */
const updateObras_localizaciones_a = async (req, res) => {
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
      obras_localizaciones_aSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedObras_localizaciones_a = await dbService.update(Obras_localizaciones_a,query,dataToUpdate);
    return  res.success({ data :updatedObras_localizaciones_a }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Obras_localizaciones_a with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_localizaciones_as.
 * @return {Object} : updated Obras_localizaciones_as. {status, message, data}
 */
const bulkUpdateObras_localizaciones_a = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedObras_localizaciones_a = await dbService.update(Obras_localizaciones_a,filter,dataToUpdate);
    if (!updatedObras_localizaciones_a){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedObras_localizaciones_a.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Obras_localizaciones_a with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_localizaciones_a.
 * @return {Object} : updated Obras_localizaciones_a. {status, message, data}
 */
const partialUpdateObras_localizaciones_a = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      obras_localizaciones_aSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedObras_localizaciones_a = await dbService.update(Obras_localizaciones_a, query, dataToUpdate);
    if (!updatedObras_localizaciones_a) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedObras_localizaciones_a });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Obras_localizaciones_a from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Obras_localizaciones_a.
 * @return {Object} : deactivated Obras_localizaciones_a. {status, message, data}
 */
const softDeleteObras_localizaciones_a = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Obras_localizaciones_a, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Obras_localizaciones_a from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Obras_localizaciones_a. {status, message, data}
 */
const deleteObras_localizaciones_a = async (req, res) => {
  const result = await dbService.deleteByPk(Obras_localizaciones_a, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Obras_localizaciones_a in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyObras_localizaciones_a = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedObras_localizaciones_a = await dbService.destroy(Obras_localizaciones_a,query);
    return res.success({ data :{ count :deletedObras_localizaciones_a.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Obras_localizaciones_a from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Obras_localizaciones_a.
 * @return {Object} : number of deactivated documents of Obras_localizaciones_a. {status, message, data}
 */
const softDeleteManyObras_localizaciones_a = async (req, res) => {
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
    let updatedObras_localizaciones_a = await dbService.update(Obras_localizaciones_a,query,updateBody, options);
    if (!updatedObras_localizaciones_a) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedObras_localizaciones_a.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addObras_localizaciones_a,
  bulkInsertObras_localizaciones_a,
  findAllObras_localizaciones_a,
  getObras_localizaciones_a,
  getObras_localizaciones_aCount,
  updateObras_localizaciones_a,
  bulkUpdateObras_localizaciones_a,
  partialUpdateObras_localizaciones_a,
  softDeleteObras_localizaciones_a,
  deleteObras_localizaciones_a,
  deleteManyObras_localizaciones_a,
  softDeleteManyObras_localizaciones_a,
};
