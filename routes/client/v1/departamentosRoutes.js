/**
 * departamentosRoutes.js
 * @description :: CRUD API routes for departamentos
 */

const express = require('express');
const router = express.Router();
const departamentosController = require('../../../controller/client/v1/departamentosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/departamentos/create').post(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.addDepartamentos);
router.route('/client/api/v1/departamentos/list').post(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.findAllDepartamentos);
router.route('/client/api/v1/departamentos/count').post(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.getDepartamentosCount);
router.route('/client/api/v1/departamentos/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.getDepartamentos);
router.route('/client/api/v1/departamentos/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.updateDepartamentos);    
router.route('/client/api/v1/departamentos/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.partialUpdateDepartamentos);
router.route('/client/api/v1/departamentos/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.softDeleteDepartamentos);
router.route('/client/api/v1/departamentos/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.softDeleteManyDepartamentos);
router.route('/client/api/v1/departamentos/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.bulkInsertDepartamentos);
router.route('/client/api/v1/departamentos/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.bulkUpdateDepartamentos);
router.route('/client/api/v1/departamentos/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.deleteDepartamentos);
router.route('/client/api/v1/departamentos/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,departamentosController.deleteManyDepartamentos);

module.exports = router;
