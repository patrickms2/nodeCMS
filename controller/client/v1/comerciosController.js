/**
 * comerciosController.js
 * @description :: exports action methods for comercios.
 */

const Comercios = require('../../../model/comercios');
const comerciosSchemaKey = require('../../../utils/validation/comerciosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Comercios in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Comercios. {status, message, data}
 */ 
const addComercios = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      comerciosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdComercios = await dbService.createOne(Comercios,dataToCreate);
    return  res.success({ data :createdComercios });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Comercios in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Comercioss. {status, message, data}
 */
const bulkInsertComercios = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdComercios = await dbService.createMany(Comercios,dataToCreate); 
      return  res.success({ data :{ count :createdComercios.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Comercios from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Comercios(s). {status, message, data}
 */
const findAllComercios = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundComercios;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      comerciosSchemaKey.findFilterKeys,
      Comercios.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundComercios = await dbService.count(Comercios, query);
      if (!foundComercios) {
        return res.recordNotFound();
      } 
      foundComercios = { totalRecords: foundComercios };
      return res.success({ data :foundComercios });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundComercios = await dbService.paginate( Comercios,query,options);
    if (!foundComercios){
      return res.recordNotFound();
    }
    return res.success({ data:foundComercios }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Comercios from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Comercios. {status, message, data}
 */
const getComercios = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundComercios = await dbService.findOne(Comercios,{ id :id });
    if (!foundComercios){
      return res.recordNotFound();
    }
    return  res.success({ data :foundComercios });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Comercios.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getComerciosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      comerciosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedComercios = await dbService.count(Comercios,where);
    if (!countedComercios){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedComercios } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Comercios with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Comercios.
 * @return {Object} : updated Comercios. {status, message, data}
 */
const updateComercios = async (req, res) => {
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
      comerciosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedComercios = await dbService.update(Comercios,query,dataToUpdate);
    return  res.success({ data :updatedComercios }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Comercios with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Comercioss.
 * @return {Object} : updated Comercioss. {status, message, data}
 */
const bulkUpdateComercios = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedComercios = await dbService.update(Comercios,filter,dataToUpdate);
    if (!updatedComercios){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedComercios.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Comercios with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Comercios.
 * @return {Object} : updated Comercios. {status, message, data}
 */
const partialUpdateComercios = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      comerciosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedComercios = await dbService.update(Comercios, query, dataToUpdate);
    if (!updatedComercios) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedComercios });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Comercios from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Comercios.
 * @return {Object} : deactivated Comercios. {status, message, data}
 */
const softDeleteComercios = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Comercios, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Comercios from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Comercios. {status, message, data}
 */
const deleteComercios = async (req, res) => {
  const result = await dbService.deleteByPk(Comercios, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Comercios in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyComercios = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedComercios = await dbService.destroy(Comercios,query);
    return res.success({ data :{ count :deletedComercios.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Comercios from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Comercios.
 * @return {Object} : number of deactivated documents of Comercios. {status, message, data}
 */
const softDeleteManyComercios = async (req, res) => {
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
    let updatedComercios = await dbService.update(Comercios,query,updateBody, options);
    if (!updatedComercios) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedComercios.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addComercios,
  bulkInsertComercios,
  findAllComercios,
  getComercios,
  getComerciosCount,
  updateComercios,
  bulkUpdateComercios,
  partialUpdateComercios,
  softDeleteComercios,
  deleteComercios,
  deleteManyComercios,
  softDeleteManyComercios,
};
