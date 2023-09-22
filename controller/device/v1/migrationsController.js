/**
 * migrationsController.js
 * @description :: exports action methods for migrations.
 */

const Migrations = require('../../../model/migrations');
const migrationsSchemaKey = require('../../../utils/validation/migrationsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Migrations in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Migrations. {status, message, data}
 */ 
const addMigrations = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      migrationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdMigrations = await dbService.createOne(Migrations,dataToCreate);
    return  res.success({ data :createdMigrations });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Migrations in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Migrationss. {status, message, data}
 */
const bulkInsertMigrations = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdMigrations = await dbService.createMany(Migrations,dataToCreate); 
      return  res.success({ data :{ count :createdMigrations.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Migrations from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Migrations(s). {status, message, data}
 */
const findAllMigrations = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundMigrations;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      migrationsSchemaKey.findFilterKeys,
      Migrations.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundMigrations = await dbService.count(Migrations, query);
      if (!foundMigrations) {
        return res.recordNotFound();
      } 
      foundMigrations = { totalRecords: foundMigrations };
      return res.success({ data :foundMigrations });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundMigrations = await dbService.paginate( Migrations,query,options);
    if (!foundMigrations){
      return res.recordNotFound();
    }
    return res.success({ data:foundMigrations }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Migrations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Migrations. {status, message, data}
 */
const getMigrations = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundMigrations = await dbService.findOne(Migrations,{ id :id });
    if (!foundMigrations){
      return res.recordNotFound();
    }
    return  res.success({ data :foundMigrations });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Migrations.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getMigrationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      migrationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedMigrations = await dbService.count(Migrations,where);
    if (!countedMigrations){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedMigrations } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Migrations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Migrations.
 * @return {Object} : updated Migrations. {status, message, data}
 */
const updateMigrations = async (req, res) => {
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
      migrationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedMigrations = await dbService.update(Migrations,query,dataToUpdate);
    return  res.success({ data :updatedMigrations }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Migrations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Migrationss.
 * @return {Object} : updated Migrationss. {status, message, data}
 */
const bulkUpdateMigrations = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedMigrations = await dbService.update(Migrations,filter,dataToUpdate);
    if (!updatedMigrations){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedMigrations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Migrations with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Migrations.
 * @return {Object} : updated Migrations. {status, message, data}
 */
const partialUpdateMigrations = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      migrationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedMigrations = await dbService.update(Migrations, query, dataToUpdate);
    if (!updatedMigrations) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedMigrations });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Migrations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Migrations.
 * @return {Object} : deactivated Migrations. {status, message, data}
 */
const softDeleteMigrations = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Migrations, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Migrations from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Migrations. {status, message, data}
 */
const deleteMigrations = async (req, res) => {
  const result = await dbService.deleteByPk(Migrations, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Migrations in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyMigrations = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedMigrations = await dbService.destroy(Migrations,query);
    return res.success({ data :{ count :deletedMigrations.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Migrations from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Migrations.
 * @return {Object} : number of deactivated documents of Migrations. {status, message, data}
 */
const softDeleteManyMigrations = async (req, res) => {
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
    let updatedMigrations = await dbService.update(Migrations,query,updateBody, options);
    if (!updatedMigrations) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedMigrations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addMigrations,
  bulkInsertMigrations,
  findAllMigrations,
  getMigrations,
  getMigrationsCount,
  updateMigrations,
  bulkUpdateMigrations,
  partialUpdateMigrations,
  softDeleteMigrations,
  deleteMigrations,
  deleteManyMigrations,
  softDeleteManyMigrations,
};
