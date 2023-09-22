/**
 * tagsController.js
 * @description :: exports action methods for tags.
 */

const Tags = require('../../../model/tags');
const tagsSchemaKey = require('../../../utils/validation/tagsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Tags in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Tags. {status, message, data}
 */ 
const addTags = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      tagsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdTags = await dbService.createOne(Tags,dataToCreate);
    return  res.success({ data :createdTags });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Tags in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Tagss. {status, message, data}
 */
const bulkInsertTags = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdTags = await dbService.createMany(Tags,dataToCreate); 
      return  res.success({ data :{ count :createdTags.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Tags from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Tags(s). {status, message, data}
 */
const findAllTags = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundTags;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      tagsSchemaKey.findFilterKeys,
      Tags.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundTags = await dbService.count(Tags, query);
      if (!foundTags) {
        return res.recordNotFound();
      } 
      foundTags = { totalRecords: foundTags };
      return res.success({ data :foundTags });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundTags = await dbService.paginate( Tags,query,options);
    if (!foundTags){
      return res.recordNotFound();
    }
    return res.success({ data:foundTags }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Tags from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Tags. {status, message, data}
 */
const getTags = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundTags = await dbService.findOne(Tags,{ id :id });
    if (!foundTags){
      return res.recordNotFound();
    }
    return  res.success({ data :foundTags });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Tags.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getTagsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      tagsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedTags = await dbService.count(Tags,where);
    if (!countedTags){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedTags } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Tags with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tags.
 * @return {Object} : updated Tags. {status, message, data}
 */
const updateTags = async (req, res) => {
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
      tagsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedTags = await dbService.update(Tags,query,dataToUpdate);
    return  res.success({ data :updatedTags }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Tags with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tagss.
 * @return {Object} : updated Tagss. {status, message, data}
 */
const bulkUpdateTags = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedTags = await dbService.update(Tags,filter,dataToUpdate);
    if (!updatedTags){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedTags.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Tags with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tags.
 * @return {Object} : updated Tags. {status, message, data}
 */
const partialUpdateTags = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tagsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedTags = await dbService.update(Tags, query, dataToUpdate);
    if (!updatedTags) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedTags });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Tags from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Tags.
 * @return {Object} : deactivated Tags. {status, message, data}
 */
const softDeleteTags = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Tags, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Tags from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Tags. {status, message, data}
 */
const deleteTags = async (req, res) => {
  const result = await dbService.deleteByPk(Tags, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Tags in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyTags = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedTags = await dbService.destroy(Tags,query);
    return res.success({ data :{ count :deletedTags.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Tags from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Tags.
 * @return {Object} : number of deactivated documents of Tags. {status, message, data}
 */
const softDeleteManyTags = async (req, res) => {
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
    let updatedTags = await dbService.update(Tags,query,updateBody, options);
    if (!updatedTags) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedTags.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addTags,
  bulkInsertTags,
  findAllTags,
  getTags,
  getTagsCount,
  updateTags,
  bulkUpdateTags,
  partialUpdateTags,
  softDeleteTags,
  deleteTags,
  deleteManyTags,
  softDeleteManyTags,
};
