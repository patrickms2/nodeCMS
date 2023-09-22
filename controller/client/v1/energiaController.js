/**
 * energiaController.js
 * @description :: exports action methods for energia.
 */

const Energia = require('../../../model/energia');
const energiaSchemaKey = require('../../../utils/validation/energiaValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Energia in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Energia. {status, message, data}
 */ 
const addEnergia = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      energiaSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdEnergia = await dbService.createOne(Energia,dataToCreate);
    return  res.success({ data :createdEnergia });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Energia in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Energias. {status, message, data}
 */
const bulkInsertEnergia = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdEnergia = await dbService.createMany(Energia,dataToCreate); 
      return  res.success({ data :{ count :createdEnergia.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Energia from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Energia(s). {status, message, data}
 */
const findAllEnergia = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundEnergia;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      energiaSchemaKey.findFilterKeys,
      Energia.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundEnergia = await dbService.count(Energia, query);
      if (!foundEnergia) {
        return res.recordNotFound();
      } 
      foundEnergia = { totalRecords: foundEnergia };
      return res.success({ data :foundEnergia });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundEnergia = await dbService.paginate( Energia,query,options);
    if (!foundEnergia){
      return res.recordNotFound();
    }
    return res.success({ data:foundEnergia }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Energia from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Energia. {status, message, data}
 */
const getEnergia = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundEnergia = await dbService.findOne(Energia,{ id :id });
    if (!foundEnergia){
      return res.recordNotFound();
    }
    return  res.success({ data :foundEnergia });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Energia.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getEnergiaCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      energiaSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedEnergia = await dbService.count(Energia,where);
    if (!countedEnergia){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedEnergia } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Energia with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Energia.
 * @return {Object} : updated Energia. {status, message, data}
 */
const updateEnergia = async (req, res) => {
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
      energiaSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedEnergia = await dbService.update(Energia,query,dataToUpdate);
    return  res.success({ data :updatedEnergia }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Energia with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Energias.
 * @return {Object} : updated Energias. {status, message, data}
 */
const bulkUpdateEnergia = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedEnergia = await dbService.update(Energia,filter,dataToUpdate);
    if (!updatedEnergia){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedEnergia.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Energia with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Energia.
 * @return {Object} : updated Energia. {status, message, data}
 */
const partialUpdateEnergia = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      energiaSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedEnergia = await dbService.update(Energia, query, dataToUpdate);
    if (!updatedEnergia) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedEnergia });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Energia from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Energia.
 * @return {Object} : deactivated Energia. {status, message, data}
 */
const softDeleteEnergia = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Energia, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Energia from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Energia. {status, message, data}
 */
const deleteEnergia = async (req, res) => {
  const result = await dbService.deleteByPk(Energia, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Energia in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyEnergia = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedEnergia = await dbService.destroy(Energia,query);
    return res.success({ data :{ count :deletedEnergia.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Energia from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Energia.
 * @return {Object} : number of deactivated documents of Energia. {status, message, data}
 */
const softDeleteManyEnergia = async (req, res) => {
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
    let updatedEnergia = await dbService.update(Energia,query,updateBody, options);
    if (!updatedEnergia) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedEnergia.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addEnergia,
  bulkInsertEnergia,
  findAllEnergia,
  getEnergia,
  getEnergiaCount,
  updateEnergia,
  bulkUpdateEnergia,
  partialUpdateEnergia,
  softDeleteEnergia,
  deleteEnergia,
  deleteManyEnergia,
  softDeleteManyEnergia,
};
