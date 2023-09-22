/**
 * reservasController.js
 * @description :: exports action methods for reservas.
 */

const Reservas = require('../../../model/reservas');
const reservasSchemaKey = require('../../../utils/validation/reservasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Reservas in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Reservas. {status, message, data}
 */ 
const addReservas = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      reservasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdReservas = await dbService.createOne(Reservas,dataToCreate);
    return  res.success({ data :createdReservas });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Reservas in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Reservass. {status, message, data}
 */
const bulkInsertReservas = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdReservas = await dbService.createMany(Reservas,dataToCreate); 
      return  res.success({ data :{ count :createdReservas.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Reservas from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Reservas(s). {status, message, data}
 */
const findAllReservas = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundReservas;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      reservasSchemaKey.findFilterKeys,
      Reservas.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundReservas = await dbService.count(Reservas, query);
      if (!foundReservas) {
        return res.recordNotFound();
      } 
      foundReservas = { totalRecords: foundReservas };
      return res.success({ data :foundReservas });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundReservas = await dbService.paginate( Reservas,query,options);
    if (!foundReservas){
      return res.recordNotFound();
    }
    return res.success({ data:foundReservas }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Reservas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Reservas. {status, message, data}
 */
const getReservas = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundReservas = await dbService.findOne(Reservas,{ id :id });
    if (!foundReservas){
      return res.recordNotFound();
    }
    return  res.success({ data :foundReservas });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Reservas.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getReservasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      reservasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedReservas = await dbService.count(Reservas,where);
    if (!countedReservas){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedReservas } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Reservas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reservas.
 * @return {Object} : updated Reservas. {status, message, data}
 */
const updateReservas = async (req, res) => {
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
      reservasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedReservas = await dbService.update(Reservas,query,dataToUpdate);
    return  res.success({ data :updatedReservas }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Reservas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reservass.
 * @return {Object} : updated Reservass. {status, message, data}
 */
const bulkUpdateReservas = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedReservas = await dbService.update(Reservas,filter,dataToUpdate);
    if (!updatedReservas){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedReservas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Reservas with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reservas.
 * @return {Object} : updated Reservas. {status, message, data}
 */
const partialUpdateReservas = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      reservasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedReservas = await dbService.update(Reservas, query, dataToUpdate);
    if (!updatedReservas) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedReservas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Reservas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Reservas.
 * @return {Object} : deactivated Reservas. {status, message, data}
 */
const softDeleteReservas = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Reservas, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Reservas from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Reservas. {status, message, data}
 */
const deleteReservas = async (req, res) => {
  const result = await dbService.deleteByPk(Reservas, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Reservas in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyReservas = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedReservas = await dbService.destroy(Reservas,query);
    return res.success({ data :{ count :deletedReservas.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Reservas from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Reservas.
 * @return {Object} : number of deactivated documents of Reservas. {status, message, data}
 */
const softDeleteManyReservas = async (req, res) => {
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
    let updatedReservas = await dbService.update(Reservas,query,updateBody, options);
    if (!updatedReservas) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedReservas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addReservas,
  bulkInsertReservas,
  findAllReservas,
  getReservas,
  getReservasCount,
  updateReservas,
  bulkUpdateReservas,
  partialUpdateReservas,
  softDeleteReservas,
  deleteReservas,
  deleteManyReservas,
  softDeleteManyReservas,
};
