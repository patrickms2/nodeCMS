/**
 * articlesController.js
 * @description :: exports action methods for articles.
 */

const Articles = require('../../../model/articles');
const articlesSchemaKey = require('../../../utils/validation/articlesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Articles in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Articles. {status, message, data}
 */ 
const addArticles = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      articlesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdArticles = await dbService.createOne(Articles,dataToCreate);
    return  res.success({ data :createdArticles });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Articles in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Articless. {status, message, data}
 */
const bulkInsertArticles = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdArticles = await dbService.createMany(Articles,dataToCreate); 
      return  res.success({ data :{ count :createdArticles.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Articles from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Articles(s). {status, message, data}
 */
const findAllArticles = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundArticles;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      articlesSchemaKey.findFilterKeys,
      Articles.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundArticles = await dbService.count(Articles, query);
      if (!foundArticles) {
        return res.recordNotFound();
      } 
      foundArticles = { totalRecords: foundArticles };
      return res.success({ data :foundArticles });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundArticles = await dbService.paginate( Articles,query,options);
    if (!foundArticles){
      return res.recordNotFound();
    }
    return res.success({ data:foundArticles }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Articles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Articles. {status, message, data}
 */
const getArticles = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundArticles = await dbService.findOne(Articles,{ id :id });
    if (!foundArticles){
      return res.recordNotFound();
    }
    return  res.success({ data :foundArticles });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Articles.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getArticlesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      articlesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedArticles = await dbService.count(Articles,where);
    if (!countedArticles){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedArticles } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Articles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Articles.
 * @return {Object} : updated Articles. {status, message, data}
 */
const updateArticles = async (req, res) => {
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
      articlesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedArticles = await dbService.update(Articles,query,dataToUpdate);
    return  res.success({ data :updatedArticles }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Articles with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Articless.
 * @return {Object} : updated Articless. {status, message, data}
 */
const bulkUpdateArticles = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedArticles = await dbService.update(Articles,filter,dataToUpdate);
    if (!updatedArticles){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedArticles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Articles with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Articles.
 * @return {Object} : updated Articles. {status, message, data}
 */
const partialUpdateArticles = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      articlesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedArticles = await dbService.update(Articles, query, dataToUpdate);
    if (!updatedArticles) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedArticles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Articles from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Articles.
 * @return {Object} : deactivated Articles. {status, message, data}
 */
const softDeleteArticles = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Articles, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Articles from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Articles. {status, message, data}
 */
const deleteArticles = async (req, res) => {
  const result = await dbService.deleteByPk(Articles, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Articles in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyArticles = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedArticles = await dbService.destroy(Articles,query);
    return res.success({ data :{ count :deletedArticles.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Articles from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Articles.
 * @return {Object} : number of deactivated documents of Articles. {status, message, data}
 */
const softDeleteManyArticles = async (req, res) => {
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
    let updatedArticles = await dbService.update(Articles,query,updateBody, options);
    if (!updatedArticles) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedArticles.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addArticles,
  bulkInsertArticles,
  findAllArticles,
  getArticles,
  getArticlesCount,
  updateArticles,
  bulkUpdateArticles,
  partialUpdateArticles,
  softDeleteArticles,
  deleteArticles,
  deleteManyArticles,
  softDeleteManyArticles,
};
