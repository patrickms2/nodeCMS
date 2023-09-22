/**
 * obras_disciplinasController.js
 * @description :: exports action methods for obras_disciplinas.
 */

const Obras_disciplinas = require('../../../model/obras_disciplinas');
const obras_disciplinasSchemaKey = require('../../../utils/validation/obras_disciplinasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Obras_disciplinas in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Obras_disciplinas. {status, message, data}
 */ 
const addObras_disciplinas = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      obras_disciplinasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdObras_disciplinas = await dbService.createOne(Obras_disciplinas,dataToCreate);
    return  res.success({ data :createdObras_disciplinas });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Obras_disciplinas in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Obras_disciplinass. {status, message, data}
 */
const bulkInsertObras_disciplinas = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdObras_disciplinas = await dbService.createMany(Obras_disciplinas,dataToCreate); 
      return  res.success({ data :{ count :createdObras_disciplinas.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Obras_disciplinas from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Obras_disciplinas(s). {status, message, data}
 */
const findAllObras_disciplinas = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundObras_disciplinas;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      obras_disciplinasSchemaKey.findFilterKeys,
      Obras_disciplinas.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundObras_disciplinas = await dbService.count(Obras_disciplinas, query);
      if (!foundObras_disciplinas) {
        return res.recordNotFound();
      } 
      foundObras_disciplinas = { totalRecords: foundObras_disciplinas };
      return res.success({ data :foundObras_disciplinas });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundObras_disciplinas = await dbService.paginate( Obras_disciplinas,query,options);
    if (!foundObras_disciplinas){
      return res.recordNotFound();
    }
    return res.success({ data:foundObras_disciplinas }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Obras_disciplinas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Obras_disciplinas. {status, message, data}
 */
const getObras_disciplinas = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundObras_disciplinas = await dbService.findOne(Obras_disciplinas,{ id :id });
    if (!foundObras_disciplinas){
      return res.recordNotFound();
    }
    return  res.success({ data :foundObras_disciplinas });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Obras_disciplinas.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getObras_disciplinasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      obras_disciplinasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedObras_disciplinas = await dbService.count(Obras_disciplinas,where);
    if (!countedObras_disciplinas){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedObras_disciplinas } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Obras_disciplinas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_disciplinas.
 * @return {Object} : updated Obras_disciplinas. {status, message, data}
 */
const updateObras_disciplinas = async (req, res) => {
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
      obras_disciplinasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedObras_disciplinas = await dbService.update(Obras_disciplinas,query,dataToUpdate);
    return  res.success({ data :updatedObras_disciplinas }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Obras_disciplinas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_disciplinass.
 * @return {Object} : updated Obras_disciplinass. {status, message, data}
 */
const bulkUpdateObras_disciplinas = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedObras_disciplinas = await dbService.update(Obras_disciplinas,filter,dataToUpdate);
    if (!updatedObras_disciplinas){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedObras_disciplinas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Obras_disciplinas with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Obras_disciplinas.
 * @return {Object} : updated Obras_disciplinas. {status, message, data}
 */
const partialUpdateObras_disciplinas = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      obras_disciplinasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedObras_disciplinas = await dbService.update(Obras_disciplinas, query, dataToUpdate);
    if (!updatedObras_disciplinas) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedObras_disciplinas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Obras_disciplinas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Obras_disciplinas.
 * @return {Object} : deactivated Obras_disciplinas. {status, message, data}
 */
const softDeleteObras_disciplinas = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Obras_disciplinas, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Obras_disciplinas from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Obras_disciplinas. {status, message, data}
 */
const deleteObras_disciplinas = async (req, res) => {
  const result = await dbService.deleteByPk(Obras_disciplinas, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Obras_disciplinas in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyObras_disciplinas = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedObras_disciplinas = await dbService.destroy(Obras_disciplinas,query);
    return res.success({ data :{ count :deletedObras_disciplinas.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Obras_disciplinas from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Obras_disciplinas.
 * @return {Object} : number of deactivated documents of Obras_disciplinas. {status, message, data}
 */
const softDeleteManyObras_disciplinas = async (req, res) => {
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
    let updatedObras_disciplinas = await dbService.update(Obras_disciplinas,query,updateBody, options);
    if (!updatedObras_disciplinas) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedObras_disciplinas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addObras_disciplinas,
  bulkInsertObras_disciplinas,
  findAllObras_disciplinas,
  getObras_disciplinas,
  getObras_disciplinasCount,
  updateObras_disciplinas,
  bulkUpdateObras_disciplinas,
  partialUpdateObras_disciplinas,
  softDeleteObras_disciplinas,
  deleteObras_disciplinas,
  deleteManyObras_disciplinas,
  softDeleteManyObras_disciplinas,
};
