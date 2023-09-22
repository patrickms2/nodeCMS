/**
 * faqController.js
 * @description :: exports action methods for faq.
 */

const Faq = require('../../../model/faq');
const faqSchemaKey = require('../../../utils/validation/faqValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Faq in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Faq. {status, message, data}
 */ 
const addFaq = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      faqSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdFaq = await dbService.createOne(Faq,dataToCreate);
    return  res.success({ data :createdFaq });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Faq in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Faqs. {status, message, data}
 */
const bulkInsertFaq = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdFaq = await dbService.createMany(Faq,dataToCreate); 
      return  res.success({ data :{ count :createdFaq.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Faq from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Faq(s). {status, message, data}
 */
const findAllFaq = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundFaq;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      faqSchemaKey.findFilterKeys,
      Faq.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundFaq = await dbService.count(Faq, query);
      if (!foundFaq) {
        return res.recordNotFound();
      } 
      foundFaq = { totalRecords: foundFaq };
      return res.success({ data :foundFaq });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundFaq = await dbService.paginate( Faq,query,options);
    if (!foundFaq){
      return res.recordNotFound();
    }
    return res.success({ data:foundFaq }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Faq from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Faq. {status, message, data}
 */
const getFaq = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundFaq = await dbService.findOne(Faq,{ id :id });
    if (!foundFaq){
      return res.recordNotFound();
    }
    return  res.success({ data :foundFaq });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Faq.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getFaqCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      faqSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedFaq = await dbService.count(Faq,where);
    if (!countedFaq){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedFaq } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Faq with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Faq.
 * @return {Object} : updated Faq. {status, message, data}
 */
const updateFaq = async (req, res) => {
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
      faqSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedFaq = await dbService.update(Faq,query,dataToUpdate);
    return  res.success({ data :updatedFaq }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Faq with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Faqs.
 * @return {Object} : updated Faqs. {status, message, data}
 */
const bulkUpdateFaq = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedFaq = await dbService.update(Faq,filter,dataToUpdate);
    if (!updatedFaq){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedFaq.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Faq with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Faq.
 * @return {Object} : updated Faq. {status, message, data}
 */
const partialUpdateFaq = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      faqSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedFaq = await dbService.update(Faq, query, dataToUpdate);
    if (!updatedFaq) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedFaq });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Faq from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Faq.
 * @return {Object} : deactivated Faq. {status, message, data}
 */
const softDeleteFaq = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Faq, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Faq from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Faq. {status, message, data}
 */
const deleteFaq = async (req, res) => {
  const result = await dbService.deleteByPk(Faq, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Faq in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyFaq = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedFaq = await dbService.destroy(Faq,query);
    return res.success({ data :{ count :deletedFaq.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Faq from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Faq.
 * @return {Object} : number of deactivated documents of Faq. {status, message, data}
 */
const softDeleteManyFaq = async (req, res) => {
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
    let updatedFaq = await dbService.update(Faq,query,updateBody, options);
    if (!updatedFaq) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedFaq.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addFaq,
  bulkInsertFaq,
  findAllFaq,
  getFaq,
  getFaqCount,
  updateFaq,
  bulkUpdateFaq,
  partialUpdateFaq,
  softDeleteFaq,
  deleteFaq,
  deleteManyFaq,
  softDeleteManyFaq,
};
