/**
 * article_tagController.js
 * @description :: exports action methods for article_tag.
 */

const Article_tag = require('../../../model/article_tag');
const article_tagSchemaKey = require('../../../utils/validation/article_tagValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Article_tag in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Article_tag. {status, message, data}
 */ 
const addArticle_tag = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      article_tagSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdArticle_tag = await dbService.createOne(Article_tag,dataToCreate);
    return  res.success({ data :createdArticle_tag });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Article_tag in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Article_tags. {status, message, data}
 */
const bulkInsertArticle_tag = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdArticle_tag = await dbService.createMany(Article_tag,dataToCreate); 
      return  res.success({ data :{ count :createdArticle_tag.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Article_tag from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Article_tag(s). {status, message, data}
 */
const findAllArticle_tag = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundArticle_tag;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      article_tagSchemaKey.findFilterKeys,
      Article_tag.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundArticle_tag = await dbService.count(Article_tag, query);
      if (!foundArticle_tag) {
        return res.recordNotFound();
      } 
      foundArticle_tag = { totalRecords: foundArticle_tag };
      return res.success({ data :foundArticle_tag });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundArticle_tag = await dbService.paginate( Article_tag,query,options);
    if (!foundArticle_tag){
      return res.recordNotFound();
    }
    return res.success({ data:foundArticle_tag }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Article_tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Article_tag. {status, message, data}
 */
const getArticle_tag = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundArticle_tag = await dbService.findOne(Article_tag,{ id :id });
    if (!foundArticle_tag){
      return res.recordNotFound();
    }
    return  res.success({ data :foundArticle_tag });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Article_tag.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getArticle_tagCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      article_tagSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedArticle_tag = await dbService.count(Article_tag,where);
    if (!countedArticle_tag){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedArticle_tag } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Article_tag with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Article_tag.
 * @return {Object} : updated Article_tag. {status, message, data}
 */
const updateArticle_tag = async (req, res) => {
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
      article_tagSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedArticle_tag = await dbService.update(Article_tag,query,dataToUpdate);
    return  res.success({ data :updatedArticle_tag }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Article_tag with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Article_tags.
 * @return {Object} : updated Article_tags. {status, message, data}
 */
const bulkUpdateArticle_tag = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedArticle_tag = await dbService.update(Article_tag,filter,dataToUpdate);
    if (!updatedArticle_tag){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedArticle_tag.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Article_tag with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Article_tag.
 * @return {Object} : updated Article_tag. {status, message, data}
 */
const partialUpdateArticle_tag = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      article_tagSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedArticle_tag = await dbService.update(Article_tag, query, dataToUpdate);
    if (!updatedArticle_tag) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedArticle_tag });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Article_tag from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Article_tag.
 * @return {Object} : deactivated Article_tag. {status, message, data}
 */
const softDeleteArticle_tag = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Article_tag, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Article_tag from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Article_tag. {status, message, data}
 */
const deleteArticle_tag = async (req, res) => {
  const result = await dbService.deleteByPk(Article_tag, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Article_tag in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyArticle_tag = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedArticle_tag = await dbService.destroy(Article_tag,query);
    return res.success({ data :{ count :deletedArticle_tag.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Article_tag from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Article_tag.
 * @return {Object} : number of deactivated documents of Article_tag. {status, message, data}
 */
const softDeleteManyArticle_tag = async (req, res) => {
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
    let updatedArticle_tag = await dbService.update(Article_tag,query,updateBody, options);
    if (!updatedArticle_tag) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedArticle_tag.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addArticle_tag,
  bulkInsertArticle_tag,
  findAllArticle_tag,
  getArticle_tag,
  getArticle_tagCount,
  updateArticle_tag,
  bulkUpdateArticle_tag,
  partialUpdateArticle_tag,
  softDeleteArticle_tag,
  deleteArticle_tag,
  deleteManyArticle_tag,
  softDeleteManyArticle_tag,
};
