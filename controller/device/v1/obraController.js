/**
 * obraController.js
 * @description :: exports action methods for obra.
 */

const Obra = require('../../../model/obra');
const obraSchemaKey = require('../../../utils/validation/obraValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Obra in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Obra. {status, message, data}
 */ 
const addObra = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      obraSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdObra = await dbService.createOne(Obra,dataToCreate);
    return  res.success({ data :createdObra });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Obra in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Obras. {status, message, data}
 */
const bulkInsertObra = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdObra = await dbService.createMany(Obra,dataToCreate); 
      return  res.success({ data :{ count :createdObra.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Obra from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Obra(s). {status, message, data}
 */
const findAllObra = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundObra;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      obraSchemaKey.findFilterKeys,
      Obra.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundObra = await dbService.count(Obra, query);
      if (!foundObra) {
        return res.recordNotFound();
      } 
      foundObra = { totalRecords: foundObra };
      return res.success({ data :foundObra });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundObra = await dbService.paginate( Obra,query,options);
    if (!foundObra){
      return res.recordNotFound();
    }
    return res.success({ data:foundObra }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Obra from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Obra. {status, message, data}
 */
const getObra = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundObra = await dbService.findOne(Obra,{ id :id });
    if (!foundObra){
      return res.recordNotFound();
    }
    return  res.success({ data :foundObra });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Obra.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getObraCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      obraSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedObra = await dbService.count(Obra,where);
    if (!countedObra){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedObra } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Obra with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obra.
 * @return {Object} : updated Obra. {status, message, data}
 */
const updateObra = async (req, res) => {
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
      obraSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedObra = await dbService.update(Obra,query,dataToUpdate);
    return  res.success({ data :updatedObra }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Obra with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras.
 * @return {Object} : updated Obras. {status, message, data}
 */
const bulkUpdateObra = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedObra = await dbService.update(Obra,filter,dataToUpdate);
    if (!updatedObra){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedObra.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Obra with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obra.
 * @return {Object} : updated Obra. {status, message, data}
 */
const partialUpdateObra = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      obraSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedObra = await dbService.update(Obra, query, dataToUpdate);
    if (!updatedObra) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedObra });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Obra from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Obra.
 * @return {Object} : deactivated Obra. {status, message, data}
 */
const softDeleteObra = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Obra, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Obra from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Obra. {status, message, data}
 */
const deleteObra = async (req, res) => {
  const result = await dbService.deleteByPk(Obra, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Obra in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyObra = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedObra = await dbService.destroy(Obra,query);
    return res.success({ data :{ count :deletedObra.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Obra from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Obra.
 * @return {Object} : number of deactivated documents of Obra. {status, message, data}
 */
const softDeleteManyObra = async (req, res) => {
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
    let updatedObra = await dbService.update(Obra,query,updateBody, options);
    if (!updatedObra) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedObra.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addObra,
  bulkInsertObra,
  findAllObra,
  getObra,
  getObraCount,
  updateObra,
  bulkUpdateObra,
  partialUpdateObra,
  softDeleteObra,
  deleteObra,
  deleteManyObra,
  softDeleteManyObra,
};
