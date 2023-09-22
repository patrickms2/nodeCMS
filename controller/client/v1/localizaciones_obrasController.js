/**
 * localizaciones_obrasController.js
 * @description :: exports action methods for localizaciones_obras.
 */

const Localizaciones_obras = require('../../../model/localizaciones_obras');
const localizaciones_obrasSchemaKey = require('../../../utils/validation/localizaciones_obrasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Localizaciones_obras in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Localizaciones_obras. {status, message, data}
 */ 
const addLocalizaciones_obras = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      localizaciones_obrasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdLocalizaciones_obras = await dbService.createOne(Localizaciones_obras,dataToCreate);
    return  res.success({ data :createdLocalizaciones_obras });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Localizaciones_obras in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Localizaciones_obrass. {status, message, data}
 */
const bulkInsertLocalizaciones_obras = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdLocalizaciones_obras = await dbService.createMany(Localizaciones_obras,dataToCreate); 
      return  res.success({ data :{ count :createdLocalizaciones_obras.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Localizaciones_obras from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Localizaciones_obras(s). {status, message, data}
 */
const findAllLocalizaciones_obras = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundLocalizaciones_obras;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      localizaciones_obrasSchemaKey.findFilterKeys,
      Localizaciones_obras.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundLocalizaciones_obras = await dbService.count(Localizaciones_obras, query);
      if (!foundLocalizaciones_obras) {
        return res.recordNotFound();
      } 
      foundLocalizaciones_obras = { totalRecords: foundLocalizaciones_obras };
      return res.success({ data :foundLocalizaciones_obras });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundLocalizaciones_obras = await dbService.paginate( Localizaciones_obras,query,options);
    if (!foundLocalizaciones_obras){
      return res.recordNotFound();
    }
    return res.success({ data:foundLocalizaciones_obras }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Localizaciones_obras from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Localizaciones_obras. {status, message, data}
 */
const getLocalizaciones_obras = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundLocalizaciones_obras = await dbService.findOne(Localizaciones_obras,{ id :id });
    if (!foundLocalizaciones_obras){
      return res.recordNotFound();
    }
    return  res.success({ data :foundLocalizaciones_obras });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Localizaciones_obras.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getLocalizaciones_obrasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      localizaciones_obrasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedLocalizaciones_obras = await dbService.count(Localizaciones_obras,where);
    if (!countedLocalizaciones_obras){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedLocalizaciones_obras } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Localizaciones_obras with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Localizaciones_obras.
 * @return {Object} : updated Localizaciones_obras. {status, message, data}
 */
const updateLocalizaciones_obras = async (req, res) => {
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
      localizaciones_obrasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedLocalizaciones_obras = await dbService.update(Localizaciones_obras,query,dataToUpdate);
    return  res.success({ data :updatedLocalizaciones_obras }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Localizaciones_obras with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Localizaciones_obrass.
 * @return {Object} : updated Localizaciones_obrass. {status, message, data}
 */
const bulkUpdateLocalizaciones_obras = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedLocalizaciones_obras = await dbService.update(Localizaciones_obras,filter,dataToUpdate);
    if (!updatedLocalizaciones_obras){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedLocalizaciones_obras.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Localizaciones_obras with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Localizaciones_obras.
 * @return {Object} : updated Localizaciones_obras. {status, message, data}
 */
const partialUpdateLocalizaciones_obras = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      localizaciones_obrasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedLocalizaciones_obras = await dbService.update(Localizaciones_obras, query, dataToUpdate);
    if (!updatedLocalizaciones_obras) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedLocalizaciones_obras });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Localizaciones_obras from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Localizaciones_obras.
 * @return {Object} : deactivated Localizaciones_obras. {status, message, data}
 */
const softDeleteLocalizaciones_obras = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Localizaciones_obras, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Localizaciones_obras from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Localizaciones_obras. {status, message, data}
 */
const deleteLocalizaciones_obras = async (req, res) => {
  const result = await dbService.deleteByPk(Localizaciones_obras, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Localizaciones_obras in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyLocalizaciones_obras = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedLocalizaciones_obras = await dbService.destroy(Localizaciones_obras,query);
    return res.success({ data :{ count :deletedLocalizaciones_obras.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Localizaciones_obras from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Localizaciones_obras.
 * @return {Object} : number of deactivated documents of Localizaciones_obras. {status, message, data}
 */
const softDeleteManyLocalizaciones_obras = async (req, res) => {
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
    let updatedLocalizaciones_obras = await dbService.update(Localizaciones_obras,query,updateBody, options);
    if (!updatedLocalizaciones_obras) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedLocalizaciones_obras.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addLocalizaciones_obras,
  bulkInsertLocalizaciones_obras,
  findAllLocalizaciones_obras,
  getLocalizaciones_obras,
  getLocalizaciones_obrasCount,
  updateLocalizaciones_obras,
  bulkUpdateLocalizaciones_obras,
  partialUpdateLocalizaciones_obras,
  softDeleteLocalizaciones_obras,
  deleteLocalizaciones_obras,
  deleteManyLocalizaciones_obras,
  softDeleteManyLocalizaciones_obras,
};
