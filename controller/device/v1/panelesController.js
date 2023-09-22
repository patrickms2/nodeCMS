/**
 * panelesController.js
 * @description :: exports action methods for paneles.
 */

const Paneles = require('../../../model/paneles');
const panelesSchemaKey = require('../../../utils/validation/panelesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Paneles in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Paneles. {status, message, data}
 */ 
const addPaneles = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      panelesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPaneles = await dbService.createOne(Paneles,dataToCreate);
    return  res.success({ data :createdPaneles });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Paneles in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Paneless. {status, message, data}
 */
const bulkInsertPaneles = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPaneles = await dbService.createMany(Paneles,dataToCreate); 
      return  res.success({ data :{ count :createdPaneles.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Paneles from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Paneles(s). {status, message, data}
 */
const findAllPaneles = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPaneles;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      panelesSchemaKey.findFilterKeys,
      Paneles.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPaneles = await dbService.count(Paneles, query);
      if (!foundPaneles) {
        return res.recordNotFound();
      } 
      foundPaneles = { totalRecords: foundPaneles };
      return res.success({ data :foundPaneles });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPaneles = await dbService.paginate( Paneles,query,options);
    if (!foundPaneles){
      return res.recordNotFound();
    }
    return res.success({ data:foundPaneles }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Paneles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Paneles. {status, message, data}
 */
const getPaneles = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPaneles = await dbService.findOne(Paneles,{ id :id });
    if (!foundPaneles){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPaneles });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Paneles.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPanelesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      panelesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPaneles = await dbService.count(Paneles,where);
    if (!countedPaneles){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPaneles } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Paneles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Paneles.
 * @return {Object} : updated Paneles. {status, message, data}
 */
const updatePaneles = async (req, res) => {
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
      panelesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPaneles = await dbService.update(Paneles,query,dataToUpdate);
    return  res.success({ data :updatedPaneles }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Paneles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Paneless.
 * @return {Object} : updated Paneless. {status, message, data}
 */
const bulkUpdatePaneles = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPaneles = await dbService.update(Paneles,filter,dataToUpdate);
    if (!updatedPaneles){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPaneles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Paneles with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Paneles.
 * @return {Object} : updated Paneles. {status, message, data}
 */
const partialUpdatePaneles = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      panelesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPaneles = await dbService.update(Paneles, query, dataToUpdate);
    if (!updatedPaneles) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPaneles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Paneles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Paneles.
 * @return {Object} : deactivated Paneles. {status, message, data}
 */
const softDeletePaneles = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Paneles, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Paneles from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Paneles. {status, message, data}
 */
const deletePaneles = async (req, res) => {
  const result = await dbService.deleteByPk(Paneles, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Paneles in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPaneles = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPaneles = await dbService.destroy(Paneles,query);
    return res.success({ data :{ count :deletedPaneles.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Paneles from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Paneles.
 * @return {Object} : number of deactivated documents of Paneles. {status, message, data}
 */
const softDeleteManyPaneles = async (req, res) => {
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
    let updatedPaneles = await dbService.update(Paneles,query,updateBody, options);
    if (!updatedPaneles) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPaneles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPaneles,
  bulkInsertPaneles,
  findAllPaneles,
  getPaneles,
  getPanelesCount,
  updatePaneles,
  bulkUpdatePaneles,
  partialUpdatePaneles,
  softDeletePaneles,
  deletePaneles,
  deleteManyPaneles,
  softDeleteManyPaneles,
};
