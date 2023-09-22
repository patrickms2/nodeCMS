/**
 * comunicacionesRoutes.js
 * @description :: CRUD API routes for comunicaciones
 */

const express = require('express');
const router = express.Router();
const comunicacionesController = require('../../../controller/client/v1/comunicacionesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/comunicaciones/create').post(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.addComunicaciones);
router.route('/client/api/v1/comunicaciones/list').post(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.findAllComunicaciones);
router.route('/client/api/v1/comunicaciones/count').post(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.getComunicacionesCount);
router.route('/client/api/v1/comunicaciones/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.getComunicaciones);
router.route('/client/api/v1/comunicaciones/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.updateComunicaciones);    
router.route('/client/api/v1/comunicaciones/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.partialUpdateComunicaciones);
router.route('/client/api/v1/comunicaciones/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.softDeleteComunicaciones);
router.route('/client/api/v1/comunicaciones/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.softDeleteManyComunicaciones);
router.route('/client/api/v1/comunicaciones/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.bulkInsertComunicaciones);
router.route('/client/api/v1/comunicaciones/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.bulkUpdateComunicaciones);
router.route('/client/api/v1/comunicaciones/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.deleteComunicaciones);
router.route('/client/api/v1/comunicaciones/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,comunicacionesController.deleteManyComunicaciones);

module.exports = router;
