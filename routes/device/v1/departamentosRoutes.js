/**
 * departamentosRoutes.js
 * @description :: CRUD API routes for departamentos
 */

const express = require('express');
const router = express.Router();
const departamentosController = require('../../../controller/device/v1/departamentosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/departamentos/create').post(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.addDepartamentos);
router.route('/device/api/v1/departamentos/list').post(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.findAllDepartamentos);
router.route('/device/api/v1/departamentos/count').post(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.getDepartamentosCount);
router.route('/device/api/v1/departamentos/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.getDepartamentos);
router.route('/device/api/v1/departamentos/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.updateDepartamentos);    
router.route('/device/api/v1/departamentos/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.partialUpdateDepartamentos);
router.route('/device/api/v1/departamentos/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.softDeleteDepartamentos);
router.route('/device/api/v1/departamentos/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.softDeleteManyDepartamentos);
router.route('/device/api/v1/departamentos/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.bulkInsertDepartamentos);
router.route('/device/api/v1/departamentos/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.bulkUpdateDepartamentos);
router.route('/device/api/v1/departamentos/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.deleteDepartamentos);
router.route('/device/api/v1/departamentos/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,departamentosController.deleteManyDepartamentos);

module.exports = router;
