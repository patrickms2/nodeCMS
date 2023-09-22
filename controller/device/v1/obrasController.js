/**
 * obrasController.js
 * @description :: exports action methods for obras.
 */

const Obras = require('../../../model/obras');
const obrasSchemaKey = require('../../../utils/validation/obrasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Obras in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Obras. {status, message, data}
 */ 
const addObras = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      obrasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdObras = await dbService.createOne(Obras,dataToCreate);
    return  res.success({ data :createdObras });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Obras in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Obrass. {status, message, data}
 */
const bulkInsertObras = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdObras = await dbService.createMany(Obras,dataToCreate); 
      return  res.success({ data :{ count :createdObras.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Obras from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Obras(s). {status, message, data}
 */
const findAllObras = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundObras;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      obrasSchemaKey.findFilterKeys,
      Obras.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundObras = await dbService.count(Obras, query);
      if (!foundObras) {
        return res.recordNotFound();
      } 
      foundObras = { totalRecords: foundObras };
      return res.success({ data :foundObras });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundObras = await dbService.paginate( Obras,query,options);
    if (!foundObras){
      return res.recordNotFound();
    }
    return res.success({ data:foundObras }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Obras from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Obras. {status, message, data}
 */
const getObras = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundObras = await dbService.findOne(Obras,{ id :id });
    if (!foundObras){
      return res.recordNotFound();
    }
    return  res.success({ data :foundObras });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Obras.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getObrasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      obrasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedObras = await dbService.count(Obras,where);
    if (!countedObras){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedObras } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Obras with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras.
 * @return {Object} : updated Obras. {status, message, data}
 */
const updateObras = async (req, res) => {
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
      obrasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedObras = await dbService.update(Obras,query,dataToUpdate);
    return  res.success({ data :updatedObras }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Obras with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obrass.
 * @return {Object} : updated Obrass. {status, message, data}
 */
const bulkUpdateObras = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedObras = await dbService.update(Obras,filter,dataToUpdate);
    if (!updatedObras){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedObras.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Obras with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras.
 * @return {Object} : updated Obras. {status, message, data}
 */
const partialUpdateObras = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      obrasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedObras = await dbService.update(Obras, query, dataToUpdate);
    if (!updatedObras) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedObras });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Obras from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Obras.
 * @return {Object} : deactivated Obras. {status, message, data}
 */
const softDeleteObras = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Obras, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Obras from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Obras. {status, message, data}
 */
const deleteObras = async (req, res) => {
  const result = await dbService.deleteByPk(Obras, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Obras in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyObras = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedObras = await dbService.destroy(Obras,query);
    return res.success({ data :{ count :deletedObras.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Obras from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Obras.
 * @return {Object} : number of deactivated documents of Obras. {status, message, data}
 */
const softDeleteManyObras = async (req, res) => {
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
    let updatedObras = await dbService.update(Obras,query,updateBody, options);
    if (!updatedObras) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedObras.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addObras,
  bulkInsertObras,
  findAllObras,
  getObras,
  getObrasCount,
  updateObras,
  bulkUpdateObras,
  partialUpdateObras,
  softDeleteObras,
  deleteObras,
  deleteManyObras,
  softDeleteManyObras,
};
