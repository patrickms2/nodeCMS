/**
 * obras_fotosController.js
 * @description :: exports action methods for obras_fotos.
 */

const Obras_fotos = require('../../../model/obras_fotos');
const obras_fotosSchemaKey = require('../../../utils/validation/obras_fotosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Obras_fotos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Obras_fotos. {status, message, data}
 */ 
const addObras_fotos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      obras_fotosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdObras_fotos = await dbService.createOne(Obras_fotos,dataToCreate);
    return  res.success({ data :createdObras_fotos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Obras_fotos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Obras_fotoss. {status, message, data}
 */
const bulkInsertObras_fotos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdObras_fotos = await dbService.createMany(Obras_fotos,dataToCreate); 
      return  res.success({ data :{ count :createdObras_fotos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Obras_fotos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Obras_fotos(s). {status, message, data}
 */
const findAllObras_fotos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundObras_fotos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      obras_fotosSchemaKey.findFilterKeys,
      Obras_fotos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundObras_fotos = await dbService.count(Obras_fotos, query);
      if (!foundObras_fotos) {
        return res.recordNotFound();
      } 
      foundObras_fotos = { totalRecords: foundObras_fotos };
      return res.success({ data :foundObras_fotos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundObras_fotos = await dbService.paginate( Obras_fotos,query,options);
    if (!foundObras_fotos){
      return res.recordNotFound();
    }
    return res.success({ data:foundObras_fotos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Obras_fotos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Obras_fotos. {status, message, data}
 */
const getObras_fotos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundObras_fotos = await dbService.findOne(Obras_fotos,{ id :id });
    if (!foundObras_fotos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundObras_fotos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Obras_fotos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getObras_fotosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      obras_fotosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedObras_fotos = await dbService.count(Obras_fotos,where);
    if (!countedObras_fotos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedObras_fotos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Obras_fotos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_fotos.
 * @return {Object} : updated Obras_fotos. {status, message, data}
 */
const updateObras_fotos = async (req, res) => {
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
      obras_fotosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedObras_fotos = await dbService.update(Obras_fotos,query,dataToUpdate);
    return  res.success({ data :updatedObras_fotos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Obras_fotos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_fotoss.
 * @return {Object} : updated Obras_fotoss. {status, message, data}
 */
const bulkUpdateObras_fotos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedObras_fotos = await dbService.update(Obras_fotos,filter,dataToUpdate);
    if (!updatedObras_fotos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedObras_fotos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Obras_fotos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_fotos.
 * @return {Object} : updated Obras_fotos. {status, message, data}
 */
const partialUpdateObras_fotos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      obras_fotosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedObras_fotos = await dbService.update(Obras_fotos, query, dataToUpdate);
    if (!updatedObras_fotos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedObras_fotos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Obras_fotos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Obras_fotos.
 * @return {Object} : deactivated Obras_fotos. {status, message, data}
 */
const softDeleteObras_fotos = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Obras_fotos, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Obras_fotos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Obras_fotos. {status, message, data}
 */
const deleteObras_fotos = async (req, res) => {
  const result = await dbService.deleteByPk(Obras_fotos, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Obras_fotos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyObras_fotos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedObras_fotos = await dbService.destroy(Obras_fotos,query);
    return res.success({ data :{ count :deletedObras_fotos.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Obras_fotos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Obras_fotos.
 * @return {Object} : number of deactivated documents of Obras_fotos. {status, message, data}
 */
const softDeleteManyObras_fotos = async (req, res) => {
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
    let updatedObras_fotos = await dbService.update(Obras_fotos,query,updateBody, options);
    if (!updatedObras_fotos) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedObras_fotos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addObras_fotos,
  bulkInsertObras_fotos,
  findAllObras_fotos,
  getObras_fotos,
  getObras_fotosCount,
  updateObras_fotos,
  bulkUpdateObras_fotos,
  partialUpdateObras_fotos,
  softDeleteObras_fotos,
  deleteObras_fotos,
  deleteManyObras_fotos,
  softDeleteManyObras_fotos,
};
