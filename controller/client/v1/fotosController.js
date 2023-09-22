/**
 * fotosController.js
 * @description :: exports action methods for fotos.
 */

const Fotos = require('../../../model/fotos');
const fotosSchemaKey = require('../../../utils/validation/fotosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Fotos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Fotos. {status, message, data}
 */ 
const addFotos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      fotosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdFotos = await dbService.createOne(Fotos,dataToCreate);
    return  res.success({ data :createdFotos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Fotos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Fotoss. {status, message, data}
 */
const bulkInsertFotos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdFotos = await dbService.createMany(Fotos,dataToCreate); 
      return  res.success({ data :{ count :createdFotos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Fotos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Fotos(s). {status, message, data}
 */
const findAllFotos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundFotos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      fotosSchemaKey.findFilterKeys,
      Fotos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundFotos = await dbService.count(Fotos, query);
      if (!foundFotos) {
        return res.recordNotFound();
      } 
      foundFotos = { totalRecords: foundFotos };
      return res.success({ data :foundFotos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundFotos = await dbService.paginate( Fotos,query,options);
    if (!foundFotos){
      return res.recordNotFound();
    }
    return res.success({ data:foundFotos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Fotos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Fotos. {status, message, data}
 */
const getFotos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundFotos = await dbService.findOne(Fotos,{ id :id });
    if (!foundFotos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundFotos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Fotos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getFotosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      fotosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedFotos = await dbService.count(Fotos,where);
    if (!countedFotos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedFotos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Fotos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Fotos.
 * @return {Object} : updated Fotos. {status, message, data}
 */
const updateFotos = async (req, res) => {
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
      fotosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedFotos = await dbService.update(Fotos,query,dataToUpdate);
    return  res.success({ data :updatedFotos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Fotos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Fotoss.
 * @return {Object} : updated Fotoss. {status, message, data}
 */
const bulkUpdateFotos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedFotos = await dbService.update(Fotos,filter,dataToUpdate);
    if (!updatedFotos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedFotos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Fotos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Fotos.
 * @return {Object} : updated Fotos. {status, message, data}
 */
const partialUpdateFotos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      fotosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedFotos = await dbService.update(Fotos, query, dataToUpdate);
    if (!updatedFotos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedFotos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Fotos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Fotos.
 * @return {Object} : deactivated Fotos. {status, message, data}
 */
const softDeleteFotos = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Fotos, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Fotos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Fotos. {status, message, data}
 */
const deleteFotos = async (req, res) => {
  const result = await dbService.deleteByPk(Fotos, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Fotos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyFotos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedFotos = await dbService.destroy(Fotos,query);
    return res.success({ data :{ count :deletedFotos.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Fotos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Fotos.
 * @return {Object} : number of deactivated documents of Fotos. {status, message, data}
 */
const softDeleteManyFotos = async (req, res) => {
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
    let updatedFotos = await dbService.update(Fotos,query,updateBody, options);
    if (!updatedFotos) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedFotos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addFotos,
  bulkInsertFotos,
  findAllFotos,
  getFotos,
  getFotosCount,
  updateFotos,
  bulkUpdateFotos,
  partialUpdateFotos,
  softDeleteFotos,
  deleteFotos,
  deleteManyFotos,
  softDeleteManyFotos,
};
