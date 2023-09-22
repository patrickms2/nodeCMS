/**
 * apartespaciosController.js
 * @description :: exports action methods for apartespacios.
 */

const Apartespacios = require('../../../model/apartespacios');
const apartespaciosSchemaKey = require('../../../utils/validation/apartespaciosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Apartespacios in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Apartespacios. {status, message, data}
 */ 
const addApartespacios = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      apartespaciosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdApartespacios = await dbService.createOne(Apartespacios,dataToCreate);
    return  res.success({ data :createdApartespacios });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Apartespacios in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Apartespacioss. {status, message, data}
 */
const bulkInsertApartespacios = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdApartespacios = await dbService.createMany(Apartespacios,dataToCreate); 
      return  res.success({ data :{ count :createdApartespacios.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Apartespacios from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Apartespacios(s). {status, message, data}
 */
const findAllApartespacios = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundApartespacios;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      apartespaciosSchemaKey.findFilterKeys,
      Apartespacios.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundApartespacios = await dbService.count(Apartespacios, query);
      if (!foundApartespacios) {
        return res.recordNotFound();
      } 
      foundApartespacios = { totalRecords: foundApartespacios };
      return res.success({ data :foundApartespacios });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundApartespacios = await dbService.paginate( Apartespacios,query,options);
    if (!foundApartespacios){
      return res.recordNotFound();
    }
    return res.success({ data:foundApartespacios }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Apartespacios from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Apartespacios. {status, message, data}
 */
const getApartespacios = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundApartespacios = await dbService.findOne(Apartespacios,{ id :id });
    if (!foundApartespacios){
      return res.recordNotFound();
    }
    return  res.success({ data :foundApartespacios });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Apartespacios.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getApartespaciosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      apartespaciosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedApartespacios = await dbService.count(Apartespacios,where);
    if (!countedApartespacios){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedApartespacios } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Apartespacios with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Apartespacios.
 * @return {Object} : updated Apartespacios. {status, message, data}
 */
const updateApartespacios = async (req, res) => {
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
      apartespaciosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedApartespacios = await dbService.update(Apartespacios,query,dataToUpdate);
    return  res.success({ data :updatedApartespacios }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Apartespacios with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Apartespacioss.
 * @return {Object} : updated Apartespacioss. {status, message, data}
 */
const bulkUpdateApartespacios = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedApartespacios = await dbService.update(Apartespacios,filter,dataToUpdate);
    if (!updatedApartespacios){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedApartespacios.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Apartespacios with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Apartespacios.
 * @return {Object} : updated Apartespacios. {status, message, data}
 */
const partialUpdateApartespacios = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      apartespaciosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedApartespacios = await dbService.update(Apartespacios, query, dataToUpdate);
    if (!updatedApartespacios) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedApartespacios });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Apartespacios from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Apartespacios.
 * @return {Object} : deactivated Apartespacios. {status, message, data}
 */
const softDeleteApartespacios = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Apartespacios, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Apartespacios from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Apartespacios. {status, message, data}
 */
const deleteApartespacios = async (req, res) => {
  const result = await dbService.deleteByPk(Apartespacios, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Apartespacios in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyApartespacios = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedApartespacios = await dbService.destroy(Apartespacios,query);
    return res.success({ data :{ count :deletedApartespacios.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Apartespacios from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Apartespacios.
 * @return {Object} : number of deactivated documents of Apartespacios. {status, message, data}
 */
const softDeleteManyApartespacios = async (req, res) => {
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
    let updatedApartespacios = await dbService.update(Apartespacios,query,updateBody, options);
    if (!updatedApartespacios) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedApartespacios.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addApartespacios,
  bulkInsertApartespacios,
  findAllApartespacios,
  getApartespacios,
  getApartespaciosCount,
  updateApartespacios,
  bulkUpdateApartespacios,
  partialUpdateApartespacios,
  softDeleteApartespacios,
  deleteApartespacios,
  deleteManyApartespacios,
  softDeleteManyApartespacios,
};
