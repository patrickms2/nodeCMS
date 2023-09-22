/**
 * fotoobraController.js
 * @description :: exports action methods for fotoobra.
 */

const Fotoobra = require('../../../model/fotoobra');
const fotoobraSchemaKey = require('../../../utils/validation/fotoobraValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Fotoobra in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Fotoobra. {status, message, data}
 */ 
const addFotoobra = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      fotoobraSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdFotoobra = await dbService.createOne(Fotoobra,dataToCreate);
    return  res.success({ data :createdFotoobra });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Fotoobra in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Fotoobras. {status, message, data}
 */
const bulkInsertFotoobra = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdFotoobra = await dbService.createMany(Fotoobra,dataToCreate); 
      return  res.success({ data :{ count :createdFotoobra.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Fotoobra from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Fotoobra(s). {status, message, data}
 */
const findAllFotoobra = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundFotoobra;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      fotoobraSchemaKey.findFilterKeys,
      Fotoobra.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundFotoobra = await dbService.count(Fotoobra, query);
      if (!foundFotoobra) {
        return res.recordNotFound();
      } 
      foundFotoobra = { totalRecords: foundFotoobra };
      return res.success({ data :foundFotoobra });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundFotoobra = await dbService.paginate( Fotoobra,query,options);
    if (!foundFotoobra){
      return res.recordNotFound();
    }
    return res.success({ data:foundFotoobra }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Fotoobra from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Fotoobra. {status, message, data}
 */
const getFotoobra = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundFotoobra = await dbService.findOne(Fotoobra,{ id :id });
    if (!foundFotoobra){
      return res.recordNotFound();
    }
    return  res.success({ data :foundFotoobra });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Fotoobra.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getFotoobraCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      fotoobraSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedFotoobra = await dbService.count(Fotoobra,where);
    if (!countedFotoobra){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedFotoobra } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Fotoobra with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Fotoobra.
 * @return {Object} : updated Fotoobra. {status, message, data}
 */
const updateFotoobra = async (req, res) => {
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
      fotoobraSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedFotoobra = await dbService.update(Fotoobra,query,dataToUpdate);
    return  res.success({ data :updatedFotoobra }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Fotoobra with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Fotoobras.
 * @return {Object} : updated Fotoobras. {status, message, data}
 */
const bulkUpdateFotoobra = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedFotoobra = await dbService.update(Fotoobra,filter,dataToUpdate);
    if (!updatedFotoobra){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedFotoobra.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Fotoobra with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Fotoobra.
 * @return {Object} : updated Fotoobra. {status, message, data}
 */
const partialUpdateFotoobra = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      fotoobraSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedFotoobra = await dbService.update(Fotoobra, query, dataToUpdate);
    if (!updatedFotoobra) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedFotoobra });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Fotoobra from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Fotoobra.
 * @return {Object} : deactivated Fotoobra. {status, message, data}
 */
const softDeleteFotoobra = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Fotoobra, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Fotoobra from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Fotoobra. {status, message, data}
 */
const deleteFotoobra = async (req, res) => {
  const result = await dbService.deleteByPk(Fotoobra, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Fotoobra in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyFotoobra = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedFotoobra = await dbService.destroy(Fotoobra,query);
    return res.success({ data :{ count :deletedFotoobra.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Fotoobra from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Fotoobra.
 * @return {Object} : number of deactivated documents of Fotoobra. {status, message, data}
 */
const softDeleteManyFotoobra = async (req, res) => {
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
    let updatedFotoobra = await dbService.update(Fotoobra,query,updateBody, options);
    if (!updatedFotoobra) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedFotoobra.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addFotoobra,
  bulkInsertFotoobra,
  findAllFotoobra,
  getFotoobra,
  getFotoobraCount,
  updateFotoobra,
  bulkUpdateFotoobra,
  partialUpdateFotoobra,
  softDeleteFotoobra,
  deleteFotoobra,
  deleteManyFotoobra,
  softDeleteManyFotoobra,
};
