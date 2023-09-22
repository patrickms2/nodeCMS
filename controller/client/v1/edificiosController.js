/**
 * edificiosController.js
 * @description :: exports action methods for edificios.
 */

const Edificios = require('../../../model/edificios');
const edificiosSchemaKey = require('../../../utils/validation/edificiosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Edificios in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Edificios. {status, message, data}
 */ 
const addEdificios = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      edificiosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdEdificios = await dbService.createOne(Edificios,dataToCreate);
    return  res.success({ data :createdEdificios });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Edificios in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Edificioss. {status, message, data}
 */
const bulkInsertEdificios = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdEdificios = await dbService.createMany(Edificios,dataToCreate); 
      return  res.success({ data :{ count :createdEdificios.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Edificios from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Edificios(s). {status, message, data}
 */
const findAllEdificios = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundEdificios;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      edificiosSchemaKey.findFilterKeys,
      Edificios.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundEdificios = await dbService.count(Edificios, query);
      if (!foundEdificios) {
        return res.recordNotFound();
      } 
      foundEdificios = { totalRecords: foundEdificios };
      return res.success({ data :foundEdificios });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundEdificios = await dbService.paginate( Edificios,query,options);
    if (!foundEdificios){
      return res.recordNotFound();
    }
    return res.success({ data:foundEdificios }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Edificios from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Edificios. {status, message, data}
 */
const getEdificios = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundEdificios = await dbService.findOne(Edificios,{ id :id });
    if (!foundEdificios){
      return res.recordNotFound();
    }
    return  res.success({ data :foundEdificios });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Edificios.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getEdificiosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      edificiosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedEdificios = await dbService.count(Edificios,where);
    if (!countedEdificios){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedEdificios } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Edificios with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Edificios.
 * @return {Object} : updated Edificios. {status, message, data}
 */
const updateEdificios = async (req, res) => {
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
      edificiosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedEdificios = await dbService.update(Edificios,query,dataToUpdate);
    return  res.success({ data :updatedEdificios }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Edificios with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Edificioss.
 * @return {Object} : updated Edificioss. {status, message, data}
 */
const bulkUpdateEdificios = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedEdificios = await dbService.update(Edificios,filter,dataToUpdate);
    if (!updatedEdificios){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedEdificios.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Edificios with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Edificios.
 * @return {Object} : updated Edificios. {status, message, data}
 */
const partialUpdateEdificios = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      edificiosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedEdificios = await dbService.update(Edificios, query, dataToUpdate);
    if (!updatedEdificios) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedEdificios });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Edificios from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Edificios.
 * @return {Object} : deactivated Edificios. {status, message, data}
 */
const softDeleteEdificios = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Edificios, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Edificios from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Edificios. {status, message, data}
 */
const deleteEdificios = async (req, res) => {
  const result = await dbService.deleteByPk(Edificios, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Edificios in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyEdificios = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedEdificios = await dbService.destroy(Edificios,query);
    return res.success({ data :{ count :deletedEdificios.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Edificios from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Edificios.
 * @return {Object} : number of deactivated documents of Edificios. {status, message, data}
 */
const softDeleteManyEdificios = async (req, res) => {
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
    let updatedEdificios = await dbService.update(Edificios,query,updateBody, options);
    if (!updatedEdificios) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedEdificios.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addEdificios,
  bulkInsertEdificios,
  findAllEdificios,
  getEdificios,
  getEdificiosCount,
  updateEdificios,
  bulkUpdateEdificios,
  partialUpdateEdificios,
  softDeleteEdificios,
  deleteEdificios,
  deleteManyEdificios,
  softDeleteManyEdificios,
};
