/**
 * comunicacionesRoutes.js
 * @description :: CRUD API routes for comunicaciones
 */

const express = require('express');
const router = express.Router();
const comunicacionesController = require('../../../controller/device/v1/comunicacionesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/comunicaciones/create').post(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.addComunicaciones);
router.route('/device/api/v1/comunicaciones/list').post(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.findAllComunicaciones);
router.route('/device/api/v1/comunicaciones/count').post(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.getComunicacionesCount);
router.route('/device/api/v1/comunicaciones/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.getComunicaciones);
router.route('/device/api/v1/comunicaciones/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.updateComunicaciones);    
router.route('/device/api/v1/comunicaciones/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.partialUpdateComunicaciones);
router.route('/device/api/v1/comunicaciones/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.softDeleteComunicaciones);
router.route('/device/api/v1/comunicaciones/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.softDeleteManyComunicaciones);
router.route('/device/api/v1/comunicaciones/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.bulkInsertComunicaciones);
router.route('/device/api/v1/comunicaciones/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.bulkUpdateComunicaciones);
router.route('/device/api/v1/comunicaciones/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.deleteComunicaciones);
router.route('/device/api/v1/comunicaciones/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,comunicacionesController.deleteManyComunicaciones);

module.exports = router;
