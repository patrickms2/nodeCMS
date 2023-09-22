/**
 * documentosController.js
 * @description :: exports action methods for documentos.
 */

const Documentos = require('../../../model/documentos');
const documentosSchemaKey = require('../../../utils/validation/documentosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Documentos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Documentos. {status, message, data}
 */ 
const addDocumentos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      documentosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDocumentos = await dbService.createOne(Documentos,dataToCreate);
    return  res.success({ data :createdDocumentos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Documentos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Documentoss. {status, message, data}
 */
const bulkInsertDocumentos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDocumentos = await dbService.createMany(Documentos,dataToCreate); 
      return  res.success({ data :{ count :createdDocumentos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Documentos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Documentos(s). {status, message, data}
 */
const findAllDocumentos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDocumentos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      documentosSchemaKey.findFilterKeys,
      Documentos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDocumentos = await dbService.count(Documentos, query);
      if (!foundDocumentos) {
        return res.recordNotFound();
      } 
      foundDocumentos = { totalRecords: foundDocumentos };
      return res.success({ data :foundDocumentos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDocumentos = await dbService.paginate( Documentos,query,options);
    if (!foundDocumentos){
      return res.recordNotFound();
    }
    return res.success({ data:foundDocumentos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Documentos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Documentos. {status, message, data}
 */
const getDocumentos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDocumentos = await dbService.findOne(Documentos,{ id :id });
    if (!foundDocumentos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDocumentos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Documentos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDocumentosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      documentosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDocumentos = await dbService.count(Documentos,where);
    if (!countedDocumentos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDocumentos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Documentos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Documentos.
 * @return {Object} : updated Documentos. {status, message, data}
 */
const updateDocumentos = async (req, res) => {
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
      documentosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDocumentos = await dbService.update(Documentos,query,dataToUpdate);
    return  res.success({ data :updatedDocumentos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Documentos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Documentoss.
 * @return {Object} : updated Documentoss. {status, message, data}
 */
const bulkUpdateDocumentos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDocumentos = await dbService.update(Documentos,filter,dataToUpdate);
    if (!updatedDocumentos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDocumentos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Documentos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Documentos.
 * @return {Object} : updated Documentos. {status, message, data}
 */
const partialUpdateDocumentos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      documentosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDocumentos = await dbService.update(Documentos, query, dataToUpdate);
    if (!updatedDocumentos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDocumentos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Documentos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Documentos.
 * @return {Object} : deactivated Documentos. {status, message, data}
 */
const softDeleteDocumentos = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Documentos, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Documentos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Documentos. {status, message, data}
 */
const deleteDocumentos = async (req, res) => {
  const result = await dbService.deleteByPk(Documentos, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Documentos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDocumentos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedDocumentos = await dbService.destroy(Documentos,query);
    return res.success({ data :{ count :deletedDocumentos.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Documentos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Documentos.
 * @return {Object} : number of deactivated documents of Documentos. {status, message, data}
 */
const softDeleteManyDocumentos = async (req, res) => {
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
    let updatedDocumentos = await dbService.update(Documentos,query,updateBody, options);
    if (!updatedDocumentos) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedDocumentos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDocumentos,
  bulkInsertDocumentos,
  findAllDocumentos,
  getDocumentos,
  getDocumentosCount,
  updateDocumentos,
  bulkUpdateDocumentos,
  partialUpdateDocumentos,
  softDeleteDocumentos,
  deleteDocumentos,
  deleteManyDocumentos,
  softDeleteManyDocumentos,
};
