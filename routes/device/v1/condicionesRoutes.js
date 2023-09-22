/**
 * condicionesRoutes.js
 * @description :: CRUD API routes for condiciones
 */

const express = require('express');
const router = express.Router();
const condicionesController = require('../../../controller/device/v1/condicionesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/condiciones/create').post(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.addCondiciones);
router.route('/device/api/v1/condiciones/list').post(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.findAllCondiciones);
router.route('/device/api/v1/condiciones/count').post(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.getCondicionesCount);
router.route('/device/api/v1/condiciones/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.getCondiciones);
router.route('/device/api/v1/condiciones/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.updateCondiciones);    
router.route('/device/api/v1/condiciones/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.partialUpdateCondiciones);
router.route('/device/api/v1/condiciones/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.softDeleteCondiciones);
router.route('/device/api/v1/condiciones/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.softDeleteManyCondiciones);
router.route('/device/api/v1/condiciones/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.bulkInsertCondiciones);
router.route('/device/api/v1/condiciones/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.bulkUpdateCondiciones);
router.route('/device/api/v1/condiciones/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.deleteCondiciones);
router.route('/device/api/v1/condiciones/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,condicionesController.deleteManyCondiciones);

module.exports = router;
