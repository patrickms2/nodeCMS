/**
 * localizacionesController.js
 * @description :: exports action methods for localizaciones.
 */

const Localizaciones = require('../../../model/localizaciones');
const localizacionesSchemaKey = require('../../../utils/validation/localizacionesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Localizaciones in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Localizaciones. {status, message, data}
 */ 
const addLocalizaciones = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      localizacionesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdLocalizaciones = await dbService.createOne(Localizaciones,dataToCreate);
    return  res.success({ data :createdLocalizaciones });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Localizaciones in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Localizacioness. {status, message, data}
 */
const bulkInsertLocalizaciones = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdLocalizaciones = await dbService.createMany(Localizaciones,dataToCreate); 
      return  res.success({ data :{ count :createdLocalizaciones.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Localizaciones from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Localizaciones(s). {status, message, data}
 */
const findAllLocalizaciones = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundLocalizaciones;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      localizacionesSchemaKey.findFilterKeys,
      Localizaciones.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundLocalizaciones = await dbService.count(Localizaciones, query);
      if (!foundLocalizaciones) {
        return res.recordNotFound();
      } 
      foundLocalizaciones = { totalRecords: foundLocalizaciones };
      return res.success({ data :foundLocalizaciones });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundLocalizaciones = await dbService.paginate( Localizaciones,query,options);
    if (!foundLocalizaciones){
      return res.recordNotFound();
    }
    return res.success({ data:foundLocalizaciones }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Localizaciones from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Localizaciones. {status, message, data}
 */
const getLocalizaciones = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundLocalizaciones = await dbService.findOne(Localizaciones,{ id :id });
    if (!foundLocalizaciones){
      return res.recordNotFound();
    }
    return  res.success({ data :foundLocalizaciones });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Localizaciones.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getLocalizacionesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      localizacionesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedLocalizaciones = await dbService.count(Localizaciones,where);
    if (!countedLocalizaciones){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedLocalizaciones } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Localizaciones with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Localizaciones.
 * @return {Object} : updated Localizaciones. {status, message, data}
 */
const updateLocalizaciones = async (req, res) => {
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
      localizacionesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedLocalizaciones = await dbService.update(Localizaciones,query,dataToUpdate);
    return  res.success({ data :updatedLocalizaciones }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Localizaciones with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Localizacioness.
 * @return {Object} : updated Localizacioness. {status, message, data}
 */
const bulkUpdateLocalizaciones = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedLocalizaciones = await dbService.update(Localizaciones,filter,dataToUpdate);
    if (!updatedLocalizaciones){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedLocalizaciones.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Localizaciones with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Localizaciones.
 * @return {Object} : updated Localizaciones. {status, message, data}
 */
const partialUpdateLocalizaciones = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      localizacionesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedLocalizaciones = await dbService.update(Localizaciones, query, dataToUpdate);
    if (!updatedLocalizaciones) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedLocalizaciones });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Localizaciones from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Localizaciones.
 * @return {Object} : deactivated Localizaciones. {status, message, data}
 */
const softDeleteLocalizaciones = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Localizaciones, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Localizaciones from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Localizaciones. {status, message, data}
 */
const deleteLocalizaciones = async (req, res) => {
  const result = await dbService.deleteByPk(Localizaciones, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Localizaciones in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyLocalizaciones = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedLocalizaciones = await dbService.destroy(Localizaciones,query);
    return res.success({ data :{ count :deletedLocalizaciones.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Localizaciones from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Localizaciones.
 * @return {Object} : number of deactivated documents of Localizaciones. {status, message, data}
 */
const softDeleteManyLocalizaciones = async (req, res) => {
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
    let updatedLocalizaciones = await dbService.update(Localizaciones,query,updateBody, options);
    if (!updatedLocalizaciones) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedLocalizaciones.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addLocalizaciones,
  bulkInsertLocalizaciones,
  findAllLocalizaciones,
  getLocalizaciones,
  getLocalizacionesCount,
  updateLocalizaciones,
  bulkUpdateLocalizaciones,
  partialUpdateLocalizaciones,
  softDeleteLocalizaciones,
  deleteLocalizaciones,
  deleteManyLocalizaciones,
  softDeleteManyLocalizaciones,
};
