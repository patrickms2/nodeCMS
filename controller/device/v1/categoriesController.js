/**
 * categoriesController.js
 * @description :: exports action methods for categories.
 */

const Categories = require('../../../model/categories');
const categoriesSchemaKey = require('../../../utils/validation/categoriesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Categories in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Categories. {status, message, data}
 */ 
const addCategories = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      categoriesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCategories = await dbService.createOne(Categories,dataToCreate);
    return  res.success({ data :createdCategories });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Categories in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Categoriess. {status, message, data}
 */
const bulkInsertCategories = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCategories = await dbService.createMany(Categories,dataToCreate); 
      return  res.success({ data :{ count :createdCategories.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Categories from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Categories(s). {status, message, data}
 */
const findAllCategories = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCategories;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      categoriesSchemaKey.findFilterKeys,
      Categories.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCategories = await dbService.count(Categories, query);
      if (!foundCategories) {
        return res.recordNotFound();
      } 
      foundCategories = { totalRecords: foundCategories };
      return res.success({ data :foundCategories });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCategories = await dbService.paginate( Categories,query,options);
    if (!foundCategories){
      return res.recordNotFound();
    }
    return res.success({ data:foundCategories }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Categories from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Categories. {status, message, data}
 */
const getCategories = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCategories = await dbService.findOne(Categories,{ id :id });
    if (!foundCategories){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCategories });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Categories.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCategoriesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      categoriesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCategories = await dbService.count(Categories,where);
    if (!countedCategories){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCategories } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Categories with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Categories.
 * @return {Object} : updated Categories. {status, message, data}
 */
const updateCategories = async (req, res) => {
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
      categoriesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCategories = await dbService.update(Categories,query,dataToUpdate);
    return  res.success({ data :updatedCategories }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Categories with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Categoriess.
 * @return {Object} : updated Categoriess. {status, message, data}
 */
const bulkUpdateCategories = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCategories = await dbService.update(Categories,filter,dataToUpdate);
    if (!updatedCategories){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCategories.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Categories with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Categories.
 * @return {Object} : updated Categories. {status, message, data}
 */
const partialUpdateCategories = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      categoriesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCategories = await dbService.update(Categories, query, dataToUpdate);
    if (!updatedCategories) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCategories });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Categories from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Categories.
 * @return {Object} : deactivated Categories. {status, message, data}
 */
const softDeleteCategories = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Categories, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Categories from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Categories. {status, message, data}
 */
const deleteCategories = async (req, res) => {
  const result = await dbService.deleteByPk(Categories, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Categories in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCategories = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCategories = await dbService.destroy(Categories,query);
    return res.success({ data :{ count :deletedCategories.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Categories from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Categories.
 * @return {Object} : number of deactivated documents of Categories. {status, message, data}
 */
const softDeleteManyCategories = async (req, res) => {
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
    let updatedCategories = await dbService.update(Categories,query,updateBody, options);
    if (!updatedCategories) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCategories.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCategories,
  bulkInsertCategories,
  findAllCategories,
  getCategories,
  getCategoriesCount,
  updateCategories,
  bulkUpdateCategories,
  partialUpdateCategories,
  softDeleteCategories,
  deleteCategories,
  deleteManyCategories,
  softDeleteManyCategories,
};
