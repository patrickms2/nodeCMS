/**
 * galder_aController.js
 * @description :: exports action methods for galder_a.
 */

const Galder_a = require('../../../model/galder_a');
const galder_aSchemaKey = require('../../../utils/validation/galder_aValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Galder_a in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Galder_a. {status, message, data}
 */ 
const addGalder_a = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      galder_aSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdGalder_a = await dbService.createOne(Galder_a,dataToCreate);
    return  res.success({ data :createdGalder_a });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Galder_a in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Galder_as. {status, message, data}
 */
const bulkInsertGalder_a = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdGalder_a = await dbService.createMany(Galder_a,dataToCreate); 
      return  res.success({ data :{ count :createdGalder_a.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Galder_a from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Galder_a(s). {status, message, data}
 */
const findAllGalder_a = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundGalder_a;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      galder_aSchemaKey.findFilterKeys,
      Galder_a.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundGalder_a = await dbService.count(Galder_a, query);
      if (!foundGalder_a) {
        return res.recordNotFound();
      } 
      foundGalder_a = { totalRecords: foundGalder_a };
      return res.success({ data :foundGalder_a });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundGalder_a = await dbService.paginate( Galder_a,query,options);
    if (!foundGalder_a){
      return res.recordNotFound();
    }
    return res.success({ data:foundGalder_a }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Galder_a from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Galder_a. {status, message, data}
 */
const getGalder_a = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundGalder_a = await dbService.findOne(Galder_a,{ id :id });
    if (!foundGalder_a){
      return res.recordNotFound();
    }
    return  res.success({ data :foundGalder_a });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Galder_a.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getGalder_aCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      galder_aSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedGalder_a = await dbService.count(Galder_a,where);
    if (!countedGalder_a){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedGalder_a } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Galder_a with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Galder_a.
 * @return {Object} : updated Galder_a. {status, message, data}
 */
const updateGalder_a = async (req, res) => {
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
      galder_aSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedGalder_a = await dbService.update(Galder_a,query,dataToUpdate);
    return  res.success({ data :updatedGalder_a }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Galder_a with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Galder_as.
 * @return {Object} : updated Galder_as. {status, message, data}
 */
const bulkUpdateGalder_a = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedGalder_a = await dbService.update(Galder_a,filter,dataToUpdate);
    if (!updatedGalder_a){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedGalder_a.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Galder_a with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Galder_a.
 * @return {Object} : updated Galder_a. {status, message, data}
 */
const partialUpdateGalder_a = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      galder_aSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedGalder_a = await dbService.update(Galder_a, query, dataToUpdate);
    if (!updatedGalder_a) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedGalder_a });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Galder_a from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Galder_a.
 * @return {Object} : deactivated Galder_a. {status, message, data}
 */
const softDeleteGalder_a = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Galder_a, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Galder_a from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Galder_a. {status, message, data}
 */
const deleteGalder_a = async (req, res) => {
  const result = await dbService.deleteByPk(Galder_a, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Galder_a in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyGalder_a = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedGalder_a = await dbService.destroy(Galder_a,query);
    return res.success({ data :{ count :deletedGalder_a.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Galder_a from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Galder_a.
 * @return {Object} : number of deactivated documents of Galder_a. {status, message, data}
 */
const softDeleteManyGalder_a = async (req, res) => {
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
    let updatedGalder_a = await dbService.update(Galder_a,query,updateBody, options);
    if (!updatedGalder_a) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedGalder_a.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addGalder_a,
  bulkInsertGalder_a,
  findAllGalder_a,
  getGalder_a,
  getGalder_aCount,
  updateGalder_a,
  bulkUpdateGalder_a,
  partialUpdateGalder_a,
  softDeleteGalder_a,
  deleteGalder_a,
  deleteManyGalder_a,
  softDeleteManyGalder_a,
};
