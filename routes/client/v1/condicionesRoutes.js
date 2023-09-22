/**
 * condicionesRoutes.js
 * @description :: CRUD API routes for condiciones
 */

const express = require('express');
const router = express.Router();
const condicionesController = require('../../../controller/client/v1/condicionesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/condiciones/create').post(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.addCondiciones);
router.route('/client/api/v1/condiciones/list').post(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.findAllCondiciones);
router.route('/client/api/v1/condiciones/count').post(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.getCondicionesCount);
router.route('/client/api/v1/condiciones/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.getCondiciones);
router.route('/client/api/v1/condiciones/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.updateCondiciones);    
router.route('/client/api/v1/condiciones/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.partialUpdateCondiciones);
router.route('/client/api/v1/condiciones/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.softDeleteCondiciones);
router.route('/client/api/v1/condiciones/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.softDeleteManyCondiciones);
router.route('/client/api/v1/condiciones/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.bulkInsertCondiciones);
router.route('/client/api/v1/condiciones/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.bulkUpdateCondiciones);
router.route('/client/api/v1/condiciones/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.deleteCondiciones);
router.route('/client/api/v1/condiciones/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,condicionesController.deleteManyCondiciones);

module.exports = router;
