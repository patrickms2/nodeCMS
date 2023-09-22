/**
 * obras_localizaciones_aRoutes.js
 * @description :: CRUD API routes for obras_localizaciones_a
 */

const express = require('express');
const router = express.Router();
const obras_localizaciones_aController = require('../../../controller/device/v1/obras_localizaciones_aController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/obras_localizaciones_a/create').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.addObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/list').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.findAllObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/count').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.getObras_localizaciones_aCount);
router.route('/device/api/v1/obras_localizaciones_a/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.getObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.updateObras_localizaciones_a);    
router.route('/device/api/v1/obras_localizaciones_a/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.partialUpdateObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.softDeleteObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.softDeleteManyObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.bulkInsertObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.bulkUpdateObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.deleteObras_localizaciones_a);
router.route('/device/api/v1/obras_localizaciones_a/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,obras_localizaciones_aController.deleteManyObras_localizaciones_a);

module.exports = router;
