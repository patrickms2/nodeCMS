/**
 * secciones_webController.js
 * @description :: exports action methods for secciones_web.
 */

const Secciones_web = require('../../../model/secciones_web');
const secciones_webSchemaKey = require('../../../utils/validation/secciones_webValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Secciones_web in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Secciones_web. {status, message, data}
 */ 
const addSecciones_web = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      secciones_webSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdSecciones_web = await dbService.createOne(Secciones_web,dataToCreate);
    return  res.success({ data :createdSecciones_web });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Secciones_web in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Secciones_webs. {status, message, data}
 */
const bulkInsertSecciones_web = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdSecciones_web = await dbService.createMany(Secciones_web,dataToCreate); 
      return  res.success({ data :{ count :createdSecciones_web.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Secciones_web from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Secciones_web(s). {status, message, data}
 */
const findAllSecciones_web = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundSecciones_web;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      secciones_webSchemaKey.findFilterKeys,
      Secciones_web.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundSecciones_web = await dbService.count(Secciones_web, query);
      if (!foundSecciones_web) {
        return res.recordNotFound();
      } 
      foundSecciones_web = { totalRecords: foundSecciones_web };
      return res.success({ data :foundSecciones_web });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundSecciones_web = await dbService.paginate( Secciones_web,query,options);
    if (!foundSecciones_web){
      return res.recordNotFound();
    }
    return res.success({ data:foundSecciones_web }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Secciones_web from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Secciones_web. {status, message, data}
 */
const getSecciones_web = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundSecciones_web = await dbService.findOne(Secciones_web,{ id :id });
    if (!foundSecciones_web){
      return res.recordNotFound();
    }
    return  res.success({ data :foundSecciones_web });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Secciones_web.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getSecciones_webCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      secciones_webSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedSecciones_web = await dbService.count(Secciones_web,where);
    if (!countedSecciones_web){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedSecciones_web } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Secciones_web with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Secciones_web.
 * @return {Object} : updated Secciones_web. {status, message, data}
 */
const updateSecciones_web = async (req, res) => {
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
      secciones_webSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedSecciones_web = await dbService.update(Secciones_web,query,dataToUpdate);
    return  res.success({ data :updatedSecciones_web }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Secciones_web with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Secciones_webs.
 * @return {Object} : updated Secciones_webs. {status, message, data}
 */
const bulkUpdateSecciones_web = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedSecciones_web = await dbService.update(Secciones_web,filter,dataToUpdate);
    if (!updatedSecciones_web){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedSecciones_web.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Secciones_web with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Secciones_web.
 * @return {Object} : updated Secciones_web. {status, message, data}
 */
const partialUpdateSecciones_web = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      secciones_webSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedSecciones_web = await dbService.update(Secciones_web, query, dataToUpdate);
    if (!updatedSecciones_web) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedSecciones_web });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Secciones_web from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Secciones_web.
 * @return {Object} : deactivated Secciones_web. {status, message, data}
 */
const softDeleteSecciones_web = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Secciones_web, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Secciones_web from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Secciones_web. {status, message, data}
 */
const deleteSecciones_web = async (req, res) => {
  const result = await dbService.deleteByPk(Secciones_web, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Secciones_web in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManySecciones_web = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedSecciones_web = await dbService.destroy(Secciones_web,query);
    return res.success({ data :{ count :deletedSecciones_web.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Secciones_web from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Secciones_web.
 * @return {Object} : number of deactivated documents of Secciones_web. {status, message, data}
 */
const softDeleteManySecciones_web = async (req, res) => {
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
    let updatedSecciones_web = await dbService.update(Secciones_web,query,updateBody, options);
    if (!updatedSecciones_web) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedSecciones_web.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addSecciones_web,
  bulkInsertSecciones_web,
  findAllSecciones_web,
  getSecciones_web,
  getSecciones_webCount,
  updateSecciones_web,
  bulkUpdateSecciones_web,
  partialUpdateSecciones_web,
  softDeleteSecciones_web,
  deleteSecciones_web,
  deleteManySecciones_web,
  softDeleteManySecciones_web,
};
