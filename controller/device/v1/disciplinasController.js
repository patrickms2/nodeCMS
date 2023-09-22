/**
 * disciplinasController.js
 * @description :: exports action methods for disciplinas.
 */

const Disciplinas = require('../../../model/disciplinas');
const disciplinasSchemaKey = require('../../../utils/validation/disciplinasValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Disciplinas in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Disciplinas. {status, message, data}
 */ 
const addDisciplinas = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      disciplinasSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDisciplinas = await dbService.createOne(Disciplinas,dataToCreate);
    return  res.success({ data :createdDisciplinas });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Disciplinas in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Disciplinass. {status, message, data}
 */
const bulkInsertDisciplinas = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDisciplinas = await dbService.createMany(Disciplinas,dataToCreate); 
      return  res.success({ data :{ count :createdDisciplinas.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Disciplinas from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Disciplinas(s). {status, message, data}
 */
const findAllDisciplinas = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDisciplinas;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      disciplinasSchemaKey.findFilterKeys,
      Disciplinas.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDisciplinas = await dbService.count(Disciplinas, query);
      if (!foundDisciplinas) {
        return res.recordNotFound();
      } 
      foundDisciplinas = { totalRecords: foundDisciplinas };
      return res.success({ data :foundDisciplinas });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDisciplinas = await dbService.paginate( Disciplinas,query,options);
    if (!foundDisciplinas){
      return res.recordNotFound();
    }
    return res.success({ data:foundDisciplinas }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Disciplinas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Disciplinas. {status, message, data}
 */
const getDisciplinas = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDisciplinas = await dbService.findOne(Disciplinas,{ id :id });
    if (!foundDisciplinas){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDisciplinas });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Disciplinas.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDisciplinasCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      disciplinasSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDisciplinas = await dbService.count(Disciplinas,where);
    if (!countedDisciplinas){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDisciplinas } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Disciplinas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Disciplinas.
 * @return {Object} : updated Disciplinas. {status, message, data}
 */
const updateDisciplinas = async (req, res) => {
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
      disciplinasSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDisciplinas = await dbService.update(Disciplinas,query,dataToUpdate);
    return  res.success({ data :updatedDisciplinas }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Disciplinas with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Disciplinass.
 * @return {Object} : updated Disciplinass. {status, message, data}
 */
const bulkUpdateDisciplinas = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDisciplinas = await dbService.update(Disciplinas,filter,dataToUpdate);
    if (!updatedDisciplinas){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDisciplinas.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Disciplinas with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Disciplinas.
 * @return {Object} : updated Disciplinas. {status, message, data}
 */
const partialUpdateDisciplinas = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      disciplinasSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDisciplinas = await dbService.update(Disciplinas, query, dataToUpdate);
    if (!updatedDisciplinas) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDisciplinas });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Disciplinas from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Disciplinas.
 * @return {Object} : deactivated Disciplinas. {status, message, data}
 */
const softDeleteDisciplinas = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedDisciplinas = await deleteDependentService.softDeleteDisciplinas(query, updateBody);
    if (!updatedDisciplinas){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedDisciplinas });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Disciplinas from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Disciplinas. {status, message, data}
 */
const deleteDisciplinas = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedDisciplinas = await deleteDependentService.countDisciplinas(query);
      if (!countedDisciplinas){
        return res.recordNotFound();
      }
      return res.success({ data :countedDisciplinas });
    }
    let deletedDisciplinas = await deleteDependentService.deleteUser(query);
    if (!deletedDisciplinas){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedDisciplinas });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Disciplinas in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDisciplinas = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedDisciplinas = await deleteDependentService.countDisciplinas(query);
      if (!countedDisciplinas) {
        return res.recordNotFound();
      }
      return res.success({ data: countedDisciplinas });            
    }
    let deletedDisciplinas = await deleteDependentService.deleteDisciplinas(query);
    if (!deletedDisciplinas) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedDisciplinas });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Disciplinas from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Disciplinas.
 * @return {Object} : number of deactivated documents of Disciplinas. {status, message, data}
 */
const softDeleteManyDisciplinas = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedDisciplinas = await deleteDependentService.softDeleteDisciplinas(query, updateBody);
    if (!updatedDisciplinas) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedDisciplinas });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDisciplinas,
  bulkInsertDisciplinas,
  findAllDisciplinas,
  getDisciplinas,
  getDisciplinasCount,
  updateDisciplinas,
  bulkUpdateDisciplinas,
  partialUpdateDisciplinas,
  softDeleteDisciplinas,
  deleteDisciplinas,
  deleteManyDisciplinas,
  softDeleteManyDisciplinas,
};
