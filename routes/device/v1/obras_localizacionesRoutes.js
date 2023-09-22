/**
 * obras_localizacionesRoutes.js
 * @description :: CRUD API routes for obras_localizaciones
 */

const express = require('express');
const router = express.Router();
const obras_localizacionesController = require('../../../controller/device/v1/obras_localizacionesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/obras_localizaciones/create').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.addObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/list').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.findAllObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/count').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.getObras_localizacionesCount);
router.route('/device/api/v1/obras_localizaciones/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.getObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.updateObras_localizaciones);    
router.route('/device/api/v1/obras_localizaciones/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.partialUpdateObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.softDeleteObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.softDeleteManyObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.bulkInsertObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.bulkUpdateObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.deleteObras_localizaciones);
router.route('/device/api/v1/obras_localizaciones/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizacionesController.deleteManyObras_localizaciones);

module.exports = router;
