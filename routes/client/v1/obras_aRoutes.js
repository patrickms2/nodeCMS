/**
 * obras_aRoutes.js
 * @description :: CRUD API routes for obras_a
 */

const express = require('express');
const router = express.Router();
const obras_aController = require('../../../controller/client/v1/obras_aController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/obras_a/create').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.addObras_a);
router.route('/client/api/v1/obras_a/list').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.findAllObras_a);
router.route('/client/api/v1/obras_a/count').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.getObras_aCount);
router.route('/client/api/v1/obras_a/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.getObras_a);
router.route('/client/api/v1/obras_a/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.updateObras_a);    
router.route('/client/api/v1/obras_a/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.partialUpdateObras_a);
router.route('/client/api/v1/obras_a/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.softDeleteObras_a);
router.route('/client/api/v1/obras_a/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.softDeleteManyObras_a);
router.route('/client/api/v1/obras_a/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.bulkInsertObras_a);
router.route('/client/api/v1/obras_a/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.bulkUpdateObras_a);
router.route('/client/api/v1/obras_a/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.deleteObras_a);
router.route('/client/api/v1/obras_a/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,obras_aController.deleteManyObras_a);

module.exports = router;
