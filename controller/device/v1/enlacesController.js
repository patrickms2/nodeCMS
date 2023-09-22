/**
 * enlacesController.js
 * @description :: exports action methods for enlaces.
 */

const Enlaces = require('../../../model/enlaces');
const enlacesSchemaKey = require('../../../utils/validation/enlacesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Enlaces in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Enlaces. {status, message, data}
 */ 
const addEnlaces = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      enlacesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdEnlaces = await dbService.createOne(Enlaces,dataToCreate);
    return  res.success({ data :createdEnlaces });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Enlaces in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Enlacess. {status, message, data}
 */
const bulkInsertEnlaces = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdEnlaces = await dbService.createMany(Enlaces,dataToCreate); 
      return  res.success({ data :{ count :createdEnlaces.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Enlaces from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Enlaces(s). {status, message, data}
 */
const findAllEnlaces = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundEnlaces;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      enlacesSchemaKey.findFilterKeys,
      Enlaces.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundEnlaces = await dbService.count(Enlaces, query);
      if (!foundEnlaces) {
        return res.recordNotFound();
      } 
      foundEnlaces = { totalRecords: foundEnlaces };
      return res.success({ data :foundEnlaces });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundEnlaces = await dbService.paginate( Enlaces,query,options);
    if (!foundEnlaces){
      return res.recordNotFound();
    }
    return res.success({ data:foundEnlaces }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Enlaces from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Enlaces. {status, message, data}
 */
const getEnlaces = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundEnlaces = await dbService.findOne(Enlaces,{ id :id });
    if (!foundEnlaces){
      return res.recordNotFound();
    }
    return  res.success({ data :foundEnlaces });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Enlaces.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getEnlacesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      enlacesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedEnlaces = await dbService.count(Enlaces,where);
    if (!countedEnlaces){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedEnlaces } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Enlaces with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Enlaces.
 * @return {Object} : updated Enlaces. {status, message, data}
 */
const updateEnlaces = async (req, res) => {
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
      enlacesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedEnlaces = await dbService.update(Enlaces,query,dataToUpdate);
    return  res.success({ data :updatedEnlaces }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Enlaces with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Enlacess.
 * @return {Object} : updated Enlacess. {status, message, data}
 */
const bulkUpdateEnlaces = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedEnlaces = await dbService.update(Enlaces,filter,dataToUpdate);
    if (!updatedEnlaces){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedEnlaces.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Enlaces with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Enlaces.
 * @return {Object} : updated Enlaces. {status, message, data}
 */
const partialUpdateEnlaces = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      enlacesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedEnlaces = await dbService.update(Enlaces, query, dataToUpdate);
    if (!updatedEnlaces) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedEnlaces });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Enlaces from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Enlaces.
 * @return {Object} : deactivated Enlaces. {status, message, data}
 */
const softDeleteEnlaces = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Enlaces, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Enlaces from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Enlaces. {status, message, data}
 */
const deleteEnlaces = async (req, res) => {
  const result = await dbService.deleteByPk(Enlaces, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Enlaces in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyEnlaces = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedEnlaces = await dbService.destroy(Enlaces,query);
    return res.success({ data :{ count :deletedEnlaces.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Enlaces from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Enlaces.
 * @return {Object} : number of deactivated documents of Enlaces. {status, message, data}
 */
const softDeleteManyEnlaces = async (req, res) => {
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
    let updatedEnlaces = await dbService.update(Enlaces,query,updateBody, options);
    if (!updatedEnlaces) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedEnlaces.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addEnlaces,
  bulkInsertEnlaces,
  findAllEnlaces,
  getEnlaces,
  getEnlacesCount,
  updateEnlaces,
  bulkUpdateEnlaces,
  partialUpdateEnlaces,
  softDeleteEnlaces,
  deleteEnlaces,
  deleteManyEnlaces,
  softDeleteManyEnlaces,
};
