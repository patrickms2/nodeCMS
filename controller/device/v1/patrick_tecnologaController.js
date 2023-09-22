/**
 * patrick_tecnologaController.js
 * @description :: exports action methods for patrick_tecnologa.
 */

const Patrick_tecnologa = require('../../../model/patrick_tecnologa');
const patrick_tecnologaSchemaKey = require('../../../utils/validation/patrick_tecnologaValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Patrick_tecnologa in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Patrick_tecnologa. {status, message, data}
 */ 
const addPatrick_tecnologa = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      patrick_tecnologaSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPatrick_tecnologa = await dbService.createOne(Patrick_tecnologa,dataToCreate);
    return  res.success({ data :createdPatrick_tecnologa });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Patrick_tecnologa in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Patrick_tecnologas. {status, message, data}
 */
const bulkInsertPatrick_tecnologa = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPatrick_tecnologa = await dbService.createMany(Patrick_tecnologa,dataToCreate); 
      return  res.success({ data :{ count :createdPatrick_tecnologa.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Patrick_tecnologa from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Patrick_tecnologa(s). {status, message, data}
 */
const findAllPatrick_tecnologa = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPatrick_tecnologa;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      patrick_tecnologaSchemaKey.findFilterKeys,
      Patrick_tecnologa.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPatrick_tecnologa = await dbService.count(Patrick_tecnologa, query);
      if (!foundPatrick_tecnologa) {
        return res.recordNotFound();
      } 
      foundPatrick_tecnologa = { totalRecords: foundPatrick_tecnologa };
      return res.success({ data :foundPatrick_tecnologa });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPatrick_tecnologa = await dbService.paginate( Patrick_tecnologa,query,options);
    if (!foundPatrick_tecnologa){
      return res.recordNotFound();
    }
    return res.success({ data:foundPatrick_tecnologa }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Patrick_tecnologa from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Patrick_tecnologa. {status, message, data}
 */
const getPatrick_tecnologa = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPatrick_tecnologa = await dbService.findOne(Patrick_tecnologa,{ id :id });
    if (!foundPatrick_tecnologa){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPatrick_tecnologa });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Patrick_tecnologa.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPatrick_tecnologaCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      patrick_tecnologaSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPatrick_tecnologa = await dbService.count(Patrick_tecnologa,where);
    if (!countedPatrick_tecnologa){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPatrick_tecnologa } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Patrick_tecnologa with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Patrick_tecnologa.
 * @return {Object} : updated Patrick_tecnologa. {status, message, data}
 */
const updatePatrick_tecnologa = async (req, res) => {
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
      patrick_tecnologaSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPatrick_tecnologa = await dbService.update(Patrick_tecnologa,query,dataToUpdate);
    return  res.success({ data :updatedPatrick_tecnologa }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Patrick_tecnologa with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Patrick_tecnologas.
 * @return {Object} : updated Patrick_tecnologas. {status, message, data}
 */
const bulkUpdatePatrick_tecnologa = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPatrick_tecnologa = await dbService.update(Patrick_tecnologa,filter,dataToUpdate);
    if (!updatedPatrick_tecnologa){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPatrick_tecnologa.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Patrick_tecnologa with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Patrick_tecnologa.
 * @return {Object} : updated Patrick_tecnologa. {status, message, data}
 */
const partialUpdatePatrick_tecnologa = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      patrick_tecnologaSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPatrick_tecnologa = await dbService.update(Patrick_tecnologa, query, dataToUpdate);
    if (!updatedPatrick_tecnologa) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPatrick_tecnologa });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Patrick_tecnologa from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Patrick_tecnologa.
 * @return {Object} : deactivated Patrick_tecnologa. {status, message, data}
 */
const softDeletePatrick_tecnologa = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Patrick_tecnologa, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Patrick_tecnologa from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Patrick_tecnologa. {status, message, data}
 */
const deletePatrick_tecnologa = async (req, res) => {
  const result = await dbService.deleteByPk(Patrick_tecnologa, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Patrick_tecnologa in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPatrick_tecnologa = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPatrick_tecnologa = await dbService.destroy(Patrick_tecnologa,query);
    return res.success({ data :{ count :deletedPatrick_tecnologa.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Patrick_tecnologa from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Patrick_tecnologa.
 * @return {Object} : number of deactivated documents of Patrick_tecnologa. {status, message, data}
 */
const softDeleteManyPatrick_tecnologa = async (req, res) => {
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
    let updatedPatrick_tecnologa = await dbService.update(Patrick_tecnologa,query,updateBody, options);
    if (!updatedPatrick_tecnologa) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPatrick_tecnologa.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPatrick_tecnologa,
  bulkInsertPatrick_tecnologa,
  findAllPatrick_tecnologa,
  getPatrick_tecnologa,
  getPatrick_tecnologaCount,
  updatePatrick_tecnologa,
  bulkUpdatePatrick_tecnologa,
  partialUpdatePatrick_tecnologa,
  softDeletePatrick_tecnologa,
  deletePatrick_tecnologa,
  deleteManyPatrick_tecnologa,
  softDeleteManyPatrick_tecnologa,
};
