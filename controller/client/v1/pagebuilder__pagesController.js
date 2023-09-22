/**
 * pagebuilder__pagesController.js
 * @description :: exports action methods for pagebuilder__pages.
 */

const Pagebuilder__pages = require('../../../model/pagebuilder__pages');
const pagebuilder__pagesSchemaKey = require('../../../utils/validation/pagebuilder__pagesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Pagebuilder__pages in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Pagebuilder__pages. {status, message, data}
 */ 
const addPagebuilder__pages = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      pagebuilder__pagesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPagebuilder__pages = await dbService.createOne(Pagebuilder__pages,dataToCreate);
    return  res.success({ data :createdPagebuilder__pages });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Pagebuilder__pages in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Pagebuilder__pagess. {status, message, data}
 */
const bulkInsertPagebuilder__pages = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPagebuilder__pages = await dbService.createMany(Pagebuilder__pages,dataToCreate); 
      return  res.success({ data :{ count :createdPagebuilder__pages.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Pagebuilder__pages from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Pagebuilder__pages(s). {status, message, data}
 */
const findAllPagebuilder__pages = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPagebuilder__pages;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      pagebuilder__pagesSchemaKey.findFilterKeys,
      Pagebuilder__pages.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPagebuilder__pages = await dbService.count(Pagebuilder__pages, query);
      if (!foundPagebuilder__pages) {
        return res.recordNotFound();
      } 
      foundPagebuilder__pages = { totalRecords: foundPagebuilder__pages };
      return res.success({ data :foundPagebuilder__pages });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPagebuilder__pages = await dbService.paginate( Pagebuilder__pages,query,options);
    if (!foundPagebuilder__pages){
      return res.recordNotFound();
    }
    return res.success({ data:foundPagebuilder__pages }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Pagebuilder__pages from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Pagebuilder__pages. {status, message, data}
 */
const getPagebuilder__pages = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPagebuilder__pages = await dbService.findOne(Pagebuilder__pages,{ id :id });
    if (!foundPagebuilder__pages){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPagebuilder__pages });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Pagebuilder__pages.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPagebuilder__pagesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      pagebuilder__pagesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPagebuilder__pages = await dbService.count(Pagebuilder__pages,where);
    if (!countedPagebuilder__pages){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPagebuilder__pages } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Pagebuilder__pages with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__pages.
 * @return {Object} : updated Pagebuilder__pages. {status, message, data}
 */
const updatePagebuilder__pages = async (req, res) => {
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
      pagebuilder__pagesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPagebuilder__pages = await dbService.update(Pagebuilder__pages,query,dataToUpdate);
    return  res.success({ data :updatedPagebuilder__pages }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Pagebuilder__pages with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__pagess.
 * @return {Object} : updated Pagebuilder__pagess. {status, message, data}
 */
const bulkUpdatePagebuilder__pages = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPagebuilder__pages = await dbService.update(Pagebuilder__pages,filter,dataToUpdate);
    if (!updatedPagebuilder__pages){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPagebuilder__pages.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Pagebuilder__pages with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pagebuilder__pages.
 * @return {Object} : updated Pagebuilder__pages. {status, message, data}
 */
const partialUpdatePagebuilder__pages = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      pagebuilder__pagesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPagebuilder__pages = await dbService.update(Pagebuilder__pages, query, dataToUpdate);
    if (!updatedPagebuilder__pages) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPagebuilder__pages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Pagebuilder__pages from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Pagebuilder__pages.
 * @return {Object} : deactivated Pagebuilder__pages. {status, message, data}
 */
const softDeletePagebuilder__pages = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Pagebuilder__pages, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Pagebuilder__pages from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Pagebuilder__pages. {status, message, data}
 */
const deletePagebuilder__pages = async (req, res) => {
  const result = await dbService.deleteByPk(Pagebuilder__pages, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Pagebuilder__pages in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPagebuilder__pages = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedPagebuilder__pages = await dbService.destroy(Pagebuilder__pages,query);
    return res.success({ data :{ count :deletedPagebuilder__pages.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Pagebuilder__pages from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Pagebuilder__pages.
 * @return {Object} : number of deactivated documents of Pagebuilder__pages. {status, message, data}
 */
const softDeleteManyPagebuilder__pages = async (req, res) => {
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
    let updatedPagebuilder__pages = await dbService.update(Pagebuilder__pages,query,updateBody, options);
    if (!updatedPagebuilder__pages) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedPagebuilder__pages.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPagebuilder__pages,
  bulkInsertPagebuilder__pages,
  findAllPagebuilder__pages,
  getPagebuilder__pages,
  getPagebuilder__pagesCount,
  updatePagebuilder__pages,
  bulkUpdatePagebuilder__pages,
  partialUpdatePagebuilder__pages,
  softDeletePagebuilder__pages,
  deletePagebuilder__pages,
  deleteManyPagebuilder__pages,
  softDeleteManyPagebuilder__pages,
};
