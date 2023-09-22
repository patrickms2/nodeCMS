/**
 * alejandroController.js
 * @description :: exports action methods for alejandro.
 */

const Alejandro = require('../../../model/alejandro');
const alejandroSchemaKey = require('../../../utils/validation/alejandroValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Alejandro in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Alejandro. {status, message, data}
 */ 
const addAlejandro = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      alejandroSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAlejandro = await dbService.createOne(Alejandro,dataToCreate);
    return  res.success({ data :createdAlejandro });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Alejandro in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Alejandros. {status, message, data}
 */
const bulkInsertAlejandro = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAlejandro = await dbService.createMany(Alejandro,dataToCreate); 
      return  res.success({ data :{ count :createdAlejandro.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Alejandro from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Alejandro(s). {status, message, data}
 */
const findAllAlejandro = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAlejandro;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      alejandroSchemaKey.findFilterKeys,
      Alejandro.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAlejandro = await dbService.count(Alejandro, query);
      if (!foundAlejandro) {
        return res.recordNotFound();
      } 
      foundAlejandro = { totalRecords: foundAlejandro };
      return res.success({ data :foundAlejandro });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAlejandro = await dbService.paginate( Alejandro,query,options);
    if (!foundAlejandro){
      return res.recordNotFound();
    }
    return res.success({ data:foundAlejandro }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Alejandro from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Alejandro. {status, message, data}
 */
const getAlejandro = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAlejandro = await dbService.findOne(Alejandro,{ id :id });
    if (!foundAlejandro){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAlejandro });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Alejandro.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAlejandroCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      alejandroSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAlejandro = await dbService.count(Alejandro,where);
    if (!countedAlejandro){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAlejandro } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Alejandro with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Alejandro.
 * @return {Object} : updated Alejandro. {status, message, data}
 */
const updateAlejandro = async (req, res) => {
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
      alejandroSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAlejandro = await dbService.update(Alejandro,query,dataToUpdate);
    return  res.success({ data :updatedAlejandro }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Alejandro with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Alejandros.
 * @return {Object} : updated Alejandros. {status, message, data}
 */
const bulkUpdateAlejandro = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAlejandro = await dbService.update(Alejandro,filter,dataToUpdate);
    if (!updatedAlejandro){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAlejandro.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Alejandro with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Alejandro.
 * @return {Object} : updated Alejandro. {status, message, data}
 */
const partialUpdateAlejandro = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      alejandroSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAlejandro = await dbService.update(Alejandro, query, dataToUpdate);
    if (!updatedAlejandro) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAlejandro });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Alejandro from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Alejandro.
 * @return {Object} : deactivated Alejandro. {status, message, data}
 */
const softDeleteAlejandro = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Alejandro, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Alejandro from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Alejandro. {status, message, data}
 */
const deleteAlejandro = async (req, res) => {
  const result = await dbService.deleteByPk(Alejandro, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Alejandro in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAlejandro = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAlejandro = await dbService.destroy(Alejandro,query);
    return res.success({ data :{ count :deletedAlejandro.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Alejandro from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Alejandro.
 * @return {Object} : number of deactivated documents of Alejandro. {status, message, data}
 */
const softDeleteManyAlejandro = async (req, res) => {
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
    let updatedAlejandro = await dbService.update(Alejandro,query,updateBody, options);
    if (!updatedAlejandro) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAlejandro.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAlejandro,
  bulkInsertAlejandro,
  findAllAlejandro,
  getAlejandro,
  getAlejandroCount,
  updateAlejandro,
  bulkUpdateAlejandro,
  partialUpdateAlejandro,
  softDeleteAlejandro,
  deleteAlejandro,
  deleteManyAlejandro,
  softDeleteManyAlejandro,
};
