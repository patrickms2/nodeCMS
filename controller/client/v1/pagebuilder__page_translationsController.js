/**
 * pagebuilder__page_translationsController.js
 * @description :: exports action methods for pagebuilder__page_translations.
 */

const Pagebuilder__page_translations = require('../../../model/pagebuilder__page_translations');
const pagebuilder__page_translationsSchemaKey = require('../../../utils/validation/pagebuilder__page_translationsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Pagebuilder__page_translations in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Pagebuilder__page_translations. {status, message, data}
 */ 
const addPagebuilder__page_translations = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      pagebuilder__page_translationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPagebuilder__page_translations = await dbService.createOne(Pagebuilder__page_translations,dataToCreate);
    return  res.success({ data :createdPagebuilder__page_translations });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Pagebuilder__page_translations in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Pagebuilder__page_translationss. {status, message, data}
 */
const bulkInsertPagebuilder__page_translations = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPagebuilder__page_translations = await dbService.createMany(Pagebuilder__page_translations,dataToCreate); 
      return  res.success({ data :{ count :createdPagebuilder__page_translations.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Pagebuilder__page_translations from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Pagebuilder__page_translations(s). {status, message, data}
 */
const findAllPagebuilder__page_translations = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPagebuilder__page_translations;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      pagebuilder__page_translationsSchemaKey.findFilterKeys,
      Pagebuilder__page_translations.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPagebuilder__page_translations = await dbService.count(Pagebuilder__page_translations, query);
      if (!foundPagebuilder__page_translations) {
        return res.recordNotFound();
      } 
      foundPagebuilder__page_translations = { totalRecords: foundPagebuilder__page_translations };
      return res.success({ data :foundPagebuilder__page_translations });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPagebuilder__page_translations = await dbService.paginate( Pagebuilder__page_translations,query,options);
    if (!foundPagebuilder__page_translations){
      return res.recordNotFound();
    }
    return res.success({ data:foundPagebuilder__page_translations }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Pagebuilder__page_translations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Pagebuilder__page_translations. {status, message, data}
 */
const getPagebuilder__page_translations = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPagebuilder__page_translations = await dbService.findOne(Pagebuilder__page_translations,{ id :id });
    if (!foundPagebuilder__page_translations){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPagebuilder__page_translations });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Pagebuilder__page_translations.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPagebuilder__page_translationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      pagebuilder__page_translationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPagebuilder__page_translations = await dbService.count(Pagebuilder__page_translations,where);
    if (!countedPagebuilder__page_translations){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPagebuilder__page_translations } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Pagebuilder__page_translations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__page_translations.
 * @return {Object} : updated Pagebuilder__page_translations. {status, message, data}
 */
const updatePagebuilder__page_translations = async (req, res) => {
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
      pagebuilder__page_translationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPagebuilder__page_translations = await dbService.update(Pagebuilder__page_translations,query,dataToUpdate);
    return  res.success({ data :updatedPagebuilder__page_translations }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Pagebuilder__page_translations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__page_translationss.
 * @return {Object} : updated Pagebuilder__page_translationss. {status, message, data}
 */
const bulkUpdatePagebuilder__page_translations = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPagebuilder__page_translations = await dbService.update(Pagebuilder__page_translations,filter,dataToUpdate);
    if (!updatedPagebuilder__page_translations){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPagebuilder__page_translations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Pagebuilder__page_translations with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__page_translations.
 * @return {Object} : updated Pagebuilder__page_translations. {status, message, data}
 */
const partialUpdatePagebuilder__page_translations = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      pagebuilder__page_translationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPagebuilder__page_translations = await dbService.update(Pagebuilder__page_translations, query, dataToUpdate);
    if (!updatedPagebuilder__page_translations) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPagebuilder__page_translations });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Pagebuilder__page_translations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Pagebuilder__page_translations.
 * @return {Object} : deactivated Pagebuilder__page_translations. {status, message, data}
 */
const softDeletePagebuilder__page_translations = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Pagebuilder__page_translations, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Pagebuilder__page_translations from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Pagebuilder__page_translations. {status, message, data}
 */
const deletePagebuilder__page_translations = async (req, res) => {
  const result = await dbService.deleteByPk(Pagebuilder__page_translations, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Pagebuilder__page_translations in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPagebuilder__page_translations = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPagebuilder__page_translations = await dbService.destroy(Pagebuilder__page_translations,query);
    return res.success({ data :{ count :deletedPagebuilder__page_translations.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Pagebuilder__page_translations from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Pagebuilder__page_translations.
 * @return {Object} : number of deactivated documents of Pagebuilder__page_translations. {status, message, data}
 */
const softDeleteManyPagebuilder__page_translations = async (req, res) => {
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
    let updatedPagebuilder__page_translations = await dbService.update(Pagebuilder__page_translations,query,updateBody, options);
    if (!updatedPagebuilder__page_translations) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPagebuilder__page_translations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPagebuilder__page_translations,
  bulkInsertPagebuilder__page_translations,
  findAllPagebuilder__page_translations,
  getPagebuilder__page_translations,
  getPagebuilder__page_translationsCount,
  updatePagebuilder__page_translations,
  bulkUpdatePagebuilder__page_translations,
  partialUpdatePagebuilder__page_translations,
  softDeletePagebuilder__page_translations,
  deletePagebuilder__page_translations,
  deleteManyPagebuilder__page_translations,
  softDeleteManyPagebuilder__page_translations,
};
