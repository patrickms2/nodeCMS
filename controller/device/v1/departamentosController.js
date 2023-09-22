/**
 * departamentosController.js
 * @description :: exports action methods for departamentos.
 */

const Departamentos = require('../../../model/departamentos');
const departamentosSchemaKey = require('../../../utils/validation/departamentosValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Departamentos in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Departamentos. {status, message, data}
 */ 
const addDepartamentos = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      departamentosSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDepartamentos = await dbService.createOne(Departamentos,dataToCreate);
    return  res.success({ data :createdDepartamentos });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Departamentos in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Departamentoss. {status, message, data}
 */
const bulkInsertDepartamentos = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDepartamentos = await dbService.createMany(Departamentos,dataToCreate); 
      return  res.success({ data :{ count :createdDepartamentos.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Departamentos from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Departamentos(s). {status, message, data}
 */
const findAllDepartamentos = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDepartamentos;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      departamentosSchemaKey.findFilterKeys,
      Departamentos.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDepartamentos = await dbService.count(Departamentos, query);
      if (!foundDepartamentos) {
        return res.recordNotFound();
      } 
      foundDepartamentos = { totalRecords: foundDepartamentos };
      return res.success({ data :foundDepartamentos });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDepartamentos = await dbService.paginate( Departamentos,query,options);
    if (!foundDepartamentos){
      return res.recordNotFound();
    }
    return res.success({ data:foundDepartamentos }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Departamentos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Departamentos. {status, message, data}
 */
const getDepartamentos = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDepartamentos = await dbService.findOne(Departamentos,{ id :id });
    if (!foundDepartamentos){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDepartamentos });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Departamentos.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDepartamentosCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      departamentosSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDepartamentos = await dbService.count(Departamentos,where);
    if (!countedDepartamentos){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDepartamentos } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Departamentos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Departamentos.
 * @return {Object} : updated Departamentos. {status, message, data}
 */
const updateDepartamentos = async (req, res) => {
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
      departamentosSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDepartamentos = await dbService.update(Departamentos,query,dataToUpdate);
    return  res.success({ data :updatedDepartamentos }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Departamentos with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Departamentoss.
 * @return {Object} : updated Departamentoss. {status, message, data}
 */
const bulkUpdateDepartamentos = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDepartamentos = await dbService.update(Departamentos,filter,dataToUpdate);
    if (!updatedDepartamentos){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDepartamentos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Departamentos with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Departamentos.
 * @return {Object} : updated Departamentos. {status, message, data}
 */
const partialUpdateDepartamentos = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      departamentosSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDepartamentos = await dbService.update(Departamentos, query, dataToUpdate);
    if (!updatedDepartamentos) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDepartamentos });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Departamentos from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Departamentos.
 * @return {Object} : deactivated Departamentos. {status, message, data}
 */
const softDeleteDepartamentos = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Departamentos, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Departamentos from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Departamentos. {status, message, data}
 */
const deleteDepartamentos = async (req, res) => {
  const result = await dbService.deleteByPk(Departamentos, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Departamentos in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDepartamentos = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedDepartamentos = await dbService.destroy(Departamentos,query);
    return res.success({ data :{ count :deletedDepartamentos.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Departamentos from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Departamentos.
 * @return {Object} : number of deactivated documents of Departamentos. {status, message, data}
 */
const softDeleteManyDepartamentos = async (req, res) => {
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
    let updatedDepartamentos = await dbService.update(Departamentos,query,updateBody, options);
    if (!updatedDepartamentos) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedDepartamentos.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDepartamentos,
  bulkInsertDepartamentos,
  findAllDepartamentos,
  getDepartamentos,
  getDepartamentosCount,
  updateDepartamentos,
  bulkUpdateDepartamentos,
  partialUpdateDepartamentos,
  softDeleteDepartamentos,
  deleteDepartamentos,
  deleteManyDepartamentos,
  softDeleteManyDepartamentos,
};
