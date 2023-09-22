/**
 * paginasController.js
 * @description :: exports action methods for paginas.
 */

const Paginas = require('../../../model/paginas');
const paginasSchemaKey = require('../../../utils/validation/paginasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Paginas in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Paginas. {status, message, data}
 */ 
const addPaginas = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      paginasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPaginas = await dbService.createOne(Paginas,dataToCreate);
    return  res.success({ data :createdPaginas });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Paginas in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Paginass. {status, message, data}
 */
const bulkInsertPaginas = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPaginas = await dbService.createMany(Paginas,dataToCreate); 
      return  res.success({ data :{ count :createdPaginas.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Paginas from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Paginas(s). {status, message, data}
 */
const findAllPaginas = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPaginas;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      paginasSchemaKey.findFilterKeys,
      Paginas.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPaginas = await dbService.count(Paginas, query);
      if (!foundPaginas) {
        return res.recordNotFound();
      } 
      foundPaginas = { totalRecords: foundPaginas };
      return res.success({ data :foundPaginas });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPaginas = await dbService.paginate( Paginas,query,options);
    if (!foundPaginas){
      return res.recordNotFound();
    }
    return res.success({ data:foundPaginas }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Paginas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Paginas. {status, message, data}
 */
const getPaginas = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPaginas = await dbService.findOne(Paginas,{ id :id });
    if (!foundPaginas){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPaginas });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Paginas.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPaginasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      paginasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPaginas = await dbService.count(Paginas,where);
    if (!countedPaginas){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPaginas } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Paginas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Paginas.
 * @return {Object} : updated Paginas. {status, message, data}
 */
const updatePaginas = async (req, res) => {
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
      paginasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPaginas = await dbService.update(Paginas,query,dataToUpdate);
    return  res.success({ data :updatedPaginas }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Paginas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Paginass.
 * @return {Object} : updated Paginass. {status, message, data}
 */
const bulkUpdatePaginas = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPaginas = await dbService.update(Paginas,filter,dataToUpdate);
    if (!updatedPaginas){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPaginas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Paginas with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Paginas.
 * @return {Object} : updated Paginas. {status, message, data}
 */
const partialUpdatePaginas = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      paginasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPaginas = await dbService.update(Paginas, query, dataToUpdate);
    if (!updatedPaginas) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPaginas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Paginas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Paginas.
 * @return {Object} : deactivated Paginas. {status, message, data}
 */
const softDeletePaginas = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Paginas, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Paginas from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Paginas. {status, message, data}
 */
const deletePaginas = async (req, res) => {
  const result = await dbService.deleteByPk(Paginas, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Paginas in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPaginas = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPaginas = await dbService.destroy(Paginas,query);
    return res.success({ data :{ count :deletedPaginas.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Paginas from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Paginas.
 * @return {Object} : number of deactivated documents of Paginas. {status, message, data}
 */
const softDeleteManyPaginas = async (req, res) => {
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
    let updatedPaginas = await dbService.update(Paginas,query,updateBody, options);
    if (!updatedPaginas) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPaginas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPaginas,
  bulkInsertPaginas,
  findAllPaginas,
  getPaginas,
  getPaginasCount,
  updatePaginas,
  bulkUpdatePaginas,
  partialUpdatePaginas,
  softDeletePaginas,
  deletePaginas,
  deleteManyPaginas,
  softDeleteManyPaginas,
};
