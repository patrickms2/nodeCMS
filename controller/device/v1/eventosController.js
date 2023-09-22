/**
 * eventosController.js
 * @description :: exports action methods for eventos.
 */

const Eventos = require('../../../model/eventos');
const eventosSchemaKey = require('../../../utils/validation/eventosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Eventos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Eventos. {status, message, data}
 */ 
const addEventos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      eventosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdEventos = await dbService.createOne(Eventos,dataToCreate);
    return  res.success({ data :createdEventos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Eventos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Eventoss. {status, message, data}
 */
const bulkInsertEventos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdEventos = await dbService.createMany(Eventos,dataToCreate); 
      return  res.success({ data :{ count :createdEventos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Eventos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Eventos(s). {status, message, data}
 */
const findAllEventos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundEventos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      eventosSchemaKey.findFilterKeys,
      Eventos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundEventos = await dbService.count(Eventos, query);
      if (!foundEventos) {
        return res.recordNotFound();
      } 
      foundEventos = { totalRecords: foundEventos };
      return res.success({ data :foundEventos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundEventos = await dbService.paginate( Eventos,query,options);
    if (!foundEventos){
      return res.recordNotFound();
    }
    return res.success({ data:foundEventos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Eventos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Eventos. {status, message, data}
 */
const getEventos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundEventos = await dbService.findOne(Eventos,{ id :id });
    if (!foundEventos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundEventos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Eventos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getEventosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      eventosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedEventos = await dbService.count(Eventos,where);
    if (!countedEventos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedEventos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Eventos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Eventos.
 * @return {Object} : updated Eventos. {status, message, data}
 */
const updateEventos = async (req, res) => {
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
      eventosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedEventos = await dbService.update(Eventos,query,dataToUpdate);
    return  res.success({ data :updatedEventos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Eventos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Eventoss.
 * @return {Object} : updated Eventoss. {status, message, data}
 */
const bulkUpdateEventos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedEventos = await dbService.update(Eventos,filter,dataToUpdate);
    if (!updatedEventos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedEventos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Eventos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Eventos.
 * @return {Object} : updated Eventos. {status, message, data}
 */
const partialUpdateEventos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      eventosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedEventos = await dbService.update(Eventos, query, dataToUpdate);
    if (!updatedEventos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedEventos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Eventos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Eventos.
 * @return {Object} : deactivated Eventos. {status, message, data}
 */
const softDeleteEventos = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Eventos, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Eventos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Eventos. {status, message, data}
 */
const deleteEventos = async (req, res) => {
  const result = await dbService.deleteByPk(Eventos, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Eventos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyEventos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedEventos = await dbService.destroy(Eventos,query);
    return res.success({ data :{ count :deletedEventos.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Eventos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Eventos.
 * @return {Object} : number of deactivated documents of Eventos. {status, message, data}
 */
const softDeleteManyEventos = async (req, res) => {
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
    let updatedEventos = await dbService.update(Eventos,query,updateBody, options);
    if (!updatedEventos) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedEventos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addEventos,
  bulkInsertEventos,
  findAllEventos,
  getEventos,
  getEventosCount,
  updateEventos,
  bulkUpdateEventos,
  partialUpdateEventos,
  softDeleteEventos,
  deleteEventos,
  deleteManyEventos,
  softDeleteManyEventos,
};
