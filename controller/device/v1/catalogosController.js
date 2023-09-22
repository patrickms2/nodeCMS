/**
 * catalogosController.js
 * @description :: exports action methods for catalogos.
 */

const Catalogos = require('../../../model/catalogos');
const catalogosSchemaKey = require('../../../utils/validation/catalogosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Catalogos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Catalogos. {status, message, data}
 */ 
const addCatalogos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      catalogosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCatalogos = await dbService.createOne(Catalogos,dataToCreate);
    return  res.success({ data :createdCatalogos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Catalogos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Catalogoss. {status, message, data}
 */
const bulkInsertCatalogos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCatalogos = await dbService.createMany(Catalogos,dataToCreate); 
      return  res.success({ data :{ count :createdCatalogos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Catalogos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Catalogos(s). {status, message, data}
 */
const findAllCatalogos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCatalogos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      catalogosSchemaKey.findFilterKeys,
      Catalogos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCatalogos = await dbService.count(Catalogos, query);
      if (!foundCatalogos) {
        return res.recordNotFound();
      } 
      foundCatalogos = { totalRecords: foundCatalogos };
      return res.success({ data :foundCatalogos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCatalogos = await dbService.paginate( Catalogos,query,options);
    if (!foundCatalogos){
      return res.recordNotFound();
    }
    return res.success({ data:foundCatalogos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Catalogos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Catalogos. {status, message, data}
 */
const getCatalogos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCatalogos = await dbService.findOne(Catalogos,{ id :id });
    if (!foundCatalogos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCatalogos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Catalogos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCatalogosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      catalogosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCatalogos = await dbService.count(Catalogos,where);
    if (!countedCatalogos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCatalogos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Catalogos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Catalogos.
 * @return {Object} : updated Catalogos. {status, message, data}
 */
const updateCatalogos = async (req, res) => {
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
      catalogosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCatalogos = await dbService.update(Catalogos,query,dataToUpdate);
    return  res.success({ data :updatedCatalogos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Catalogos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Catalogoss.
 * @return {Object} : updated Catalogoss. {status, message, data}
 */
const bulkUpdateCatalogos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCatalogos = await dbService.update(Catalogos,filter,dataToUpdate);
    if (!updatedCatalogos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCatalogos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Catalogos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Catalogos.
 * @return {Object} : updated Catalogos. {status, message, data}
 */
const partialUpdateCatalogos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      catalogosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCatalogos = await dbService.update(Catalogos, query, dataToUpdate);
    if (!updatedCatalogos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCatalogos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Catalogos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Catalogos.
 * @return {Object} : deactivated Catalogos. {status, message, data}
 */
const softDeleteCatalogos = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Catalogos, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Catalogos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Catalogos. {status, message, data}
 */
const deleteCatalogos = async (req, res) => {
  const result = await dbService.deleteByPk(Catalogos, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Catalogos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCatalogos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCatalogos = await dbService.destroy(Catalogos,query);
    return res.success({ data :{ count :deletedCatalogos.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Catalogos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Catalogos.
 * @return {Object} : number of deactivated documents of Catalogos. {status, message, data}
 */
const softDeleteManyCatalogos = async (req, res) => {
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
    let updatedCatalogos = await dbService.update(Catalogos,query,updateBody, options);
    if (!updatedCatalogos) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCatalogos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCatalogos,
  bulkInsertCatalogos,
  findAllCatalogos,
  getCatalogos,
  getCatalogosCount,
  updateCatalogos,
  bulkUpdateCatalogos,
  partialUpdateCatalogos,
  softDeleteCatalogos,
  deleteCatalogos,
  deleteManyCatalogos,
  softDeleteManyCatalogos,
};
