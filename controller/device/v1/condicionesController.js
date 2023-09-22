/**
 * condicionesController.js
 * @description :: exports action methods for condiciones.
 */

const Condiciones = require('../../../model/condiciones');
const condicionesSchemaKey = require('../../../utils/validation/condicionesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Condiciones in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Condiciones. {status, message, data}
 */ 
const addCondiciones = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      condicionesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCondiciones = await dbService.createOne(Condiciones,dataToCreate);
    return  res.success({ data :createdCondiciones });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Condiciones in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Condicioness. {status, message, data}
 */
const bulkInsertCondiciones = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCondiciones = await dbService.createMany(Condiciones,dataToCreate); 
      return  res.success({ data :{ count :createdCondiciones.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Condiciones from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Condiciones(s). {status, message, data}
 */
const findAllCondiciones = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCondiciones;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      condicionesSchemaKey.findFilterKeys,
      Condiciones.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCondiciones = await dbService.count(Condiciones, query);
      if (!foundCondiciones) {
        return res.recordNotFound();
      } 
      foundCondiciones = { totalRecords: foundCondiciones };
      return res.success({ data :foundCondiciones });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCondiciones = await dbService.paginate( Condiciones,query,options);
    if (!foundCondiciones){
      return res.recordNotFound();
    }
    return res.success({ data:foundCondiciones }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Condiciones from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Condiciones. {status, message, data}
 */
const getCondiciones = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCondiciones = await dbService.findOne(Condiciones,{ id :id });
    if (!foundCondiciones){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCondiciones });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Condiciones.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCondicionesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      condicionesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCondiciones = await dbService.count(Condiciones,where);
    if (!countedCondiciones){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCondiciones } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Condiciones with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Condiciones.
 * @return {Object} : updated Condiciones. {status, message, data}
 */
const updateCondiciones = async (req, res) => {
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
      condicionesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCondiciones = await dbService.update(Condiciones,query,dataToUpdate);
    return  res.success({ data :updatedCondiciones }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Condiciones with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Condicioness.
 * @return {Object} : updated Condicioness. {status, message, data}
 */
const bulkUpdateCondiciones = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCondiciones = await dbService.update(Condiciones,filter,dataToUpdate);
    if (!updatedCondiciones){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCondiciones.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Condiciones with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Condiciones.
 * @return {Object} : updated Condiciones. {status, message, data}
 */
const partialUpdateCondiciones = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      condicionesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCondiciones = await dbService.update(Condiciones, query, dataToUpdate);
    if (!updatedCondiciones) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCondiciones });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Condiciones from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Condiciones.
 * @return {Object} : deactivated Condiciones. {status, message, data}
 */
const softDeleteCondiciones = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Condiciones, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Condiciones from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Condiciones. {status, message, data}
 */
const deleteCondiciones = async (req, res) => {
  const result = await dbService.deleteByPk(Condiciones, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Condiciones in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCondiciones = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCondiciones = await dbService.destroy(Condiciones,query);
    return res.success({ data :{ count :deletedCondiciones.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Condiciones from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Condiciones.
 * @return {Object} : number of deactivated documents of Condiciones. {status, message, data}
 */
const softDeleteManyCondiciones = async (req, res) => {
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
    let updatedCondiciones = await dbService.update(Condiciones,query,updateBody, options);
    if (!updatedCondiciones) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCondiciones.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCondiciones,
  bulkInsertCondiciones,
  findAllCondiciones,
  getCondiciones,
  getCondicionesCount,
  updateCondiciones,
  bulkUpdateCondiciones,
  partialUpdateCondiciones,
  softDeleteCondiciones,
  deleteCondiciones,
  deleteManyCondiciones,
  softDeleteManyCondiciones,
};
