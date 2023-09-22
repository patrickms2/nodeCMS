/**
 * pagebuilder__uploadsController.js
 * @description :: exports action methods for pagebuilder__uploads.
 */

const Pagebuilder__uploads = require('../../../model/pagebuilder__uploads');
const pagebuilder__uploadsSchemaKey = require('../../../utils/validation/pagebuilder__uploadsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Pagebuilder__uploads in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Pagebuilder__uploads. {status, message, data}
 */ 
const addPagebuilder__uploads = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      pagebuilder__uploadsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPagebuilder__uploads = await dbService.createOne(Pagebuilder__uploads,dataToCreate);
    return  res.success({ data :createdPagebuilder__uploads });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Pagebuilder__uploads in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Pagebuilder__uploadss. {status, message, data}
 */
const bulkInsertPagebuilder__uploads = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPagebuilder__uploads = await dbService.createMany(Pagebuilder__uploads,dataToCreate); 
      return  res.success({ data :{ count :createdPagebuilder__uploads.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Pagebuilder__uploads from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Pagebuilder__uploads(s). {status, message, data}
 */
const findAllPagebuilder__uploads = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPagebuilder__uploads;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      pagebuilder__uploadsSchemaKey.findFilterKeys,
      Pagebuilder__uploads.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPagebuilder__uploads = await dbService.count(Pagebuilder__uploads, query);
      if (!foundPagebuilder__uploads) {
        return res.recordNotFound();
      } 
      foundPagebuilder__uploads = { totalRecords: foundPagebuilder__uploads };
      return res.success({ data :foundPagebuilder__uploads });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPagebuilder__uploads = await dbService.paginate( Pagebuilder__uploads,query,options);
    if (!foundPagebuilder__uploads){
      return res.recordNotFound();
    }
    return res.success({ data:foundPagebuilder__uploads }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Pagebuilder__uploads from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Pagebuilder__uploads. {status, message, data}
 */
const getPagebuilder__uploads = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPagebuilder__uploads = await dbService.findOne(Pagebuilder__uploads,{ id :id });
    if (!foundPagebuilder__uploads){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPagebuilder__uploads });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Pagebuilder__uploads.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPagebuilder__uploadsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      pagebuilder__uploadsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPagebuilder__uploads = await dbService.count(Pagebuilder__uploads,where);
    if (!countedPagebuilder__uploads){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPagebuilder__uploads } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Pagebuilder__uploads with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__uploads.
 * @return {Object} : updated Pagebuilder__uploads. {status, message, data}
 */
const updatePagebuilder__uploads = async (req, res) => {
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
      pagebuilder__uploadsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPagebuilder__uploads = await dbService.update(Pagebuilder__uploads,query,dataToUpdate);
    return  res.success({ data :updatedPagebuilder__uploads }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Pagebuilder__uploads with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__uploadss.
 * @return {Object} : updated Pagebuilder__uploadss. {status, message, data}
 */
const bulkUpdatePagebuilder__uploads = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPagebuilder__uploads = await dbService.update(Pagebuilder__uploads,filter,dataToUpdate);
    if (!updatedPagebuilder__uploads){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPagebuilder__uploads.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Pagebuilder__uploads with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__uploads.
 * @return {Object} : updated Pagebuilder__uploads. {status, message, data}
 */
const partialUpdatePagebuilder__uploads = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      pagebuilder__uploadsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPagebuilder__uploads = await dbService.update(Pagebuilder__uploads, query, dataToUpdate);
    if (!updatedPagebuilder__uploads) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPagebuilder__uploads });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Pagebuilder__uploads from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Pagebuilder__uploads.
 * @return {Object} : deactivated Pagebuilder__uploads. {status, message, data}
 */
const softDeletePagebuilder__uploads = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Pagebuilder__uploads, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Pagebuilder__uploads from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Pagebuilder__uploads. {status, message, data}
 */
const deletePagebuilder__uploads = async (req, res) => {
  const result = await dbService.deleteByPk(Pagebuilder__uploads, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Pagebuilder__uploads in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPagebuilder__uploads = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPagebuilder__uploads = await dbService.destroy(Pagebuilder__uploads,query);
    return res.success({ data :{ count :deletedPagebuilder__uploads.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Pagebuilder__uploads from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Pagebuilder__uploads.
 * @return {Object} : number of deactivated documents of Pagebuilder__uploads. {status, message, data}
 */
const softDeleteManyPagebuilder__uploads = async (req, res) => {
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
    let updatedPagebuilder__uploads = await dbService.update(Pagebuilder__uploads,query,updateBody, options);
    if (!updatedPagebuilder__uploads) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPagebuilder__uploads.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPagebuilder__uploads,
  bulkInsertPagebuilder__uploads,
  findAllPagebuilder__uploads,
  getPagebuilder__uploads,
  getPagebuilder__uploadsCount,
  updatePagebuilder__uploads,
  bulkUpdatePagebuilder__uploads,
  partialUpdatePagebuilder__uploads,
  softDeletePagebuilder__uploads,
  deletePagebuilder__uploads,
  deleteManyPagebuilder__uploads,
  softDeleteManyPagebuilder__uploads,
};
