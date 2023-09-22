/**
 * pagesController.js
 * @description :: exports action methods for pages.
 */

const Pages = require('../../../model/pages');
const pagesSchemaKey = require('../../../utils/validation/pagesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Pages in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Pages. {status, message, data}
 */ 
const addPages = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      pagesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPages = await dbService.createOne(Pages,dataToCreate);
    return  res.success({ data :createdPages });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Pages in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Pagess. {status, message, data}
 */
const bulkInsertPages = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPages = await dbService.createMany(Pages,dataToCreate); 
      return  res.success({ data :{ count :createdPages.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Pages from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Pages(s). {status, message, data}
 */
const findAllPages = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPages;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      pagesSchemaKey.findFilterKeys,
      Pages.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPages = await dbService.count(Pages, query);
      if (!foundPages) {
        return res.recordNotFound();
      } 
      foundPages = { totalRecords: foundPages };
      return res.success({ data :foundPages });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPages = await dbService.paginate( Pages,query,options);
    if (!foundPages){
      return res.recordNotFound();
    }
    return res.success({ data:foundPages }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Pages from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Pages. {status, message, data}
 */
const getPages = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPages = await dbService.findOne(Pages,{ id :id });
    if (!foundPages){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPages });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Pages.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPagesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      pagesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPages = await dbService.count(Pages,where);
    if (!countedPages){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPages } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Pages with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pages.
 * @return {Object} : updated Pages. {status, message, data}
 */
const updatePages = async (req, res) => {
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
      pagesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPages = await dbService.update(Pages,query,dataToUpdate);
    return  res.success({ data :updatedPages }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Pages with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagess.
 * @return {Object} : updated Pagess. {status, message, data}
 */
const bulkUpdatePages = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPages = await dbService.update(Pages,filter,dataToUpdate);
    if (!updatedPages){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPages.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Pages with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pages.
 * @return {Object} : updated Pages. {status, message, data}
 */
const partialUpdatePages = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      pagesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPages = await dbService.update(Pages, query, dataToUpdate);
    if (!updatedPages) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Pages from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Pages.
 * @return {Object} : deactivated Pages. {status, message, data}
 */
const softDeletePages = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Pages, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Pages from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Pages. {status, message, data}
 */
const deletePages = async (req, res) => {
  const result = await dbService.deleteByPk(Pages, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Pages in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPages = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPages = await dbService.destroy(Pages,query);
    return res.success({ data :{ count :deletedPages.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Pages from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Pages.
 * @return {Object} : number of deactivated documents of Pages. {status, message, data}
 */
const softDeleteManyPages = async (req, res) => {
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
    let updatedPages = await dbService.update(Pages,query,updateBody, options);
    if (!updatedPages) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPages.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPages,
  bulkInsertPages,
  findAllPages,
  getPages,
  getPagesCount,
  updatePages,
  bulkUpdatePages,
  partialUpdatePages,
  softDeletePages,
  deletePages,
  deleteManyPages,
  softDeleteManyPages,
};
