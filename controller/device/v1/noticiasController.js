/**
 * noticiasController.js
 * @description :: exports action methods for noticias.
 */

const Noticias = require('../../../model/noticias');
const noticiasSchemaKey = require('../../../utils/validation/noticiasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Noticias in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Noticias. {status, message, data}
 */ 
const addNoticias = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      noticiasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdNoticias = await dbService.createOne(Noticias,dataToCreate);
    return  res.success({ data :createdNoticias });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Noticias in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Noticiass. {status, message, data}
 */
const bulkInsertNoticias = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdNoticias = await dbService.createMany(Noticias,dataToCreate); 
      return  res.success({ data :{ count :createdNoticias.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Noticias from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Noticias(s). {status, message, data}
 */
const findAllNoticias = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundNoticias;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      noticiasSchemaKey.findFilterKeys,
      Noticias.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundNoticias = await dbService.count(Noticias, query);
      if (!foundNoticias) {
        return res.recordNotFound();
      } 
      foundNoticias = { totalRecords: foundNoticias };
      return res.success({ data :foundNoticias });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundNoticias = await dbService.paginate( Noticias,query,options);
    if (!foundNoticias){
      return res.recordNotFound();
    }
    return res.success({ data:foundNoticias }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Noticias from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Noticias. {status, message, data}
 */
const getNoticias = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundNoticias = await dbService.findOne(Noticias,{ id :id });
    if (!foundNoticias){
      return res.recordNotFound();
    }
    return  res.success({ data :foundNoticias });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Noticias.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getNoticiasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      noticiasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedNoticias = await dbService.count(Noticias,where);
    if (!countedNoticias){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedNoticias } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Noticias with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Noticias.
 * @return {Object} : updated Noticias. {status, message, data}
 */
const updateNoticias = async (req, res) => {
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
      noticiasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedNoticias = await dbService.update(Noticias,query,dataToUpdate);
    return  res.success({ data :updatedNoticias }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Noticias with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Noticiass.
 * @return {Object} : updated Noticiass. {status, message, data}
 */
const bulkUpdateNoticias = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedNoticias = await dbService.update(Noticias,filter,dataToUpdate);
    if (!updatedNoticias){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedNoticias.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Noticias with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Noticias.
 * @return {Object} : updated Noticias. {status, message, data}
 */
const partialUpdateNoticias = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      noticiasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedNoticias = await dbService.update(Noticias, query, dataToUpdate);
    if (!updatedNoticias) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedNoticias });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Noticias from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Noticias.
 * @return {Object} : deactivated Noticias. {status, message, data}
 */
const softDeleteNoticias = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Noticias, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Noticias from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Noticias. {status, message, data}
 */
const deleteNoticias = async (req, res) => {
  const result = await dbService.deleteByPk(Noticias, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Noticias in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyNoticias = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedNoticias = await dbService.destroy(Noticias,query);
    return res.success({ data :{ count :deletedNoticias.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Noticias from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Noticias.
 * @return {Object} : number of deactivated documents of Noticias. {status, message, data}
 */
const softDeleteManyNoticias = async (req, res) => {
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
    let updatedNoticias = await dbService.update(Noticias,query,updateBody, options);
    if (!updatedNoticias) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedNoticias.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addNoticias,
  bulkInsertNoticias,
  findAllNoticias,
  getNoticias,
  getNoticiasCount,
  updateNoticias,
  bulkUpdateNoticias,
  partialUpdateNoticias,
  softDeleteNoticias,
  deleteNoticias,
  deleteManyNoticias,
  softDeleteManyNoticias,
};
