/**
 * ana_gestinController.js
 * @description :: exports action methods for ana_gestin.
 */

const Ana_gestin = require('../../../model/ana_gestin');
const ana_gestinSchemaKey = require('../../../utils/validation/ana_gestinValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Ana_gestin in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Ana_gestin. {status, message, data}
 */ 
const addAna_gestin = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ana_gestinSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAna_gestin = await dbService.createOne(Ana_gestin,dataToCreate);
    return  res.success({ data :createdAna_gestin });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Ana_gestin in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Ana_gestins. {status, message, data}
 */
const bulkInsertAna_gestin = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAna_gestin = await dbService.createMany(Ana_gestin,dataToCreate); 
      return  res.success({ data :{ count :createdAna_gestin.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Ana_gestin from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Ana_gestin(s). {status, message, data}
 */
const findAllAna_gestin = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAna_gestin;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      ana_gestinSchemaKey.findFilterKeys,
      Ana_gestin.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAna_gestin = await dbService.count(Ana_gestin, query);
      if (!foundAna_gestin) {
        return res.recordNotFound();
      } 
      foundAna_gestin = { totalRecords: foundAna_gestin };
      return res.success({ data :foundAna_gestin });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAna_gestin = await dbService.paginate( Ana_gestin,query,options);
    if (!foundAna_gestin){
      return res.recordNotFound();
    }
    return res.success({ data:foundAna_gestin }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Ana_gestin from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Ana_gestin. {status, message, data}
 */
const getAna_gestin = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAna_gestin = await dbService.findOne(Ana_gestin,{ id :id });
    if (!foundAna_gestin){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAna_gestin });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Ana_gestin.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAna_gestinCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      ana_gestinSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAna_gestin = await dbService.count(Ana_gestin,where);
    if (!countedAna_gestin){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAna_gestin } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Ana_gestin with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Ana_gestin.
 * @return {Object} : updated Ana_gestin. {status, message, data}
 */
const updateAna_gestin = async (req, res) => {
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
      ana_gestinSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAna_gestin = await dbService.update(Ana_gestin,query,dataToUpdate);
    return  res.success({ data :updatedAna_gestin }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Ana_gestin with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Ana_gestins.
 * @return {Object} : updated Ana_gestins. {status, message, data}
 */
const bulkUpdateAna_gestin = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAna_gestin = await dbService.update(Ana_gestin,filter,dataToUpdate);
    if (!updatedAna_gestin){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAna_gestin.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Ana_gestin with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Ana_gestin.
 * @return {Object} : updated Ana_gestin. {status, message, data}
 */
const partialUpdateAna_gestin = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ana_gestinSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAna_gestin = await dbService.update(Ana_gestin, query, dataToUpdate);
    if (!updatedAna_gestin) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAna_gestin });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Ana_gestin from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Ana_gestin.
 * @return {Object} : deactivated Ana_gestin. {status, message, data}
 */
const softDeleteAna_gestin = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Ana_gestin, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Ana_gestin from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Ana_gestin. {status, message, data}
 */
const deleteAna_gestin = async (req, res) => {
  const result = await dbService.deleteByPk(Ana_gestin, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Ana_gestin in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAna_gestin = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAna_gestin = await dbService.destroy(Ana_gestin,query);
    return res.success({ data :{ count :deletedAna_gestin.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Ana_gestin from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Ana_gestin.
 * @return {Object} : number of deactivated documents of Ana_gestin. {status, message, data}
 */
const softDeleteManyAna_gestin = async (req, res) => {
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
    let updatedAna_gestin = await dbService.update(Ana_gestin,query,updateBody, options);
    if (!updatedAna_gestin) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAna_gestin.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAna_gestin,
  bulkInsertAna_gestin,
  findAllAna_gestin,
  getAna_gestin,
  getAna_gestinCount,
  updateAna_gestin,
  bulkUpdateAna_gestin,
  partialUpdateAna_gestin,
  softDeleteAna_gestin,
  deleteAna_gestin,
  deleteManyAna_gestin,
  softDeleteManyAna_gestin,
};
