/**
 * obras_artistasController.js
 * @description :: exports action methods for obras_artistas.
 */

const Obras_artistas = require('../../../model/obras_artistas');
const obras_artistasSchemaKey = require('../../../utils/validation/obras_artistasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Obras_artistas in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Obras_artistas. {status, message, data}
 */ 
const addObras_artistas = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      obras_artistasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdObras_artistas = await dbService.createOne(Obras_artistas,dataToCreate);
    return  res.success({ data :createdObras_artistas });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Obras_artistas in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Obras_artistass. {status, message, data}
 */
const bulkInsertObras_artistas = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdObras_artistas = await dbService.createMany(Obras_artistas,dataToCreate); 
      return  res.success({ data :{ count :createdObras_artistas.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Obras_artistas from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Obras_artistas(s). {status, message, data}
 */
const findAllObras_artistas = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundObras_artistas;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      obras_artistasSchemaKey.findFilterKeys,
      Obras_artistas.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundObras_artistas = await dbService.count(Obras_artistas, query);
      if (!foundObras_artistas) {
        return res.recordNotFound();
      } 
      foundObras_artistas = { totalRecords: foundObras_artistas };
      return res.success({ data :foundObras_artistas });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundObras_artistas = await dbService.paginate( Obras_artistas,query,options);
    if (!foundObras_artistas){
      return res.recordNotFound();
    }
    return res.success({ data:foundObras_artistas }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Obras_artistas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Obras_artistas. {status, message, data}
 */
const getObras_artistas = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundObras_artistas = await dbService.findOne(Obras_artistas,{ id :id });
    if (!foundObras_artistas){
      return res.recordNotFound();
    }
    return  res.success({ data :foundObras_artistas });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Obras_artistas.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getObras_artistasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      obras_artistasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedObras_artistas = await dbService.count(Obras_artistas,where);
    if (!countedObras_artistas){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedObras_artistas } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Obras_artistas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_artistas.
 * @return {Object} : updated Obras_artistas. {status, message, data}
 */
const updateObras_artistas = async (req, res) => {
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
      obras_artistasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedObras_artistas = await dbService.update(Obras_artistas,query,dataToUpdate);
    return  res.success({ data :updatedObras_artistas }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Obras_artistas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_artistass.
 * @return {Object} : updated Obras_artistass. {status, message, data}
 */
const bulkUpdateObras_artistas = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedObras_artistas = await dbService.update(Obras_artistas,filter,dataToUpdate);
    if (!updatedObras_artistas){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedObras_artistas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Obras_artistas with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_artistas.
 * @return {Object} : updated Obras_artistas. {status, message, data}
 */
const partialUpdateObras_artistas = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      obras_artistasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedObras_artistas = await dbService.update(Obras_artistas, query, dataToUpdate);
    if (!updatedObras_artistas) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedObras_artistas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Obras_artistas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Obras_artistas.
 * @return {Object} : deactivated Obras_artistas. {status, message, data}
 */
const softDeleteObras_artistas = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Obras_artistas, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Obras_artistas from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Obras_artistas. {status, message, data}
 */
const deleteObras_artistas = async (req, res) => {
  const result = await dbService.deleteByPk(Obras_artistas, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Obras_artistas in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyObras_artistas = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedObras_artistas = await dbService.destroy(Obras_artistas,query);
    return res.success({ data :{ count :deletedObras_artistas.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Obras_artistas from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Obras_artistas.
 * @return {Object} : number of deactivated documents of Obras_artistas. {status, message, data}
 */
const softDeleteManyObras_artistas = async (req, res) => {
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
    let updatedObras_artistas = await dbService.update(Obras_artistas,query,updateBody, options);
    if (!updatedObras_artistas) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedObras_artistas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addObras_artistas,
  bulkInsertObras_artistas,
  findAllObras_artistas,
  getObras_artistas,
  getObras_artistasCount,
  updateObras_artistas,
  bulkUpdateObras_artistas,
  partialUpdateObras_artistas,
  softDeleteObras_artistas,
  deleteObras_artistas,
  deleteManyObras_artistas,
  softDeleteManyObras_artistas,
};
