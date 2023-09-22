/**
 * galder_aRoutes.js
 * @description :: CRUD API routes for galder_a
 */

const express = require('express');
const router = express.Router();
const galder_aController = require('../../../controller/client/v1/galder_aController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/galder_a/create').post(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.addGalder_a);
router.route('/client/api/v1/galder_a/list').post(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.findAllGalder_a);
router.route('/client/api/v1/galder_a/count').post(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.getGalder_aCount);
router.route('/client/api/v1/galder_a/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.getGalder_a);
router.route('/client/api/v1/galder_a/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.updateGalder_a);    
router.route('/client/api/v1/galder_a/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.partialUpdateGalder_a);
router.route('/client/api/v1/galder_a/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.softDeleteGalder_a);
router.route('/client/api/v1/galder_a/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.softDeleteManyGalder_a);
router.route('/client/api/v1/galder_a/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.bulkInsertGalder_a);
router.route('/client/api/v1/galder_a/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.bulkUpdateGalder_a);
router.route('/client/api/v1/galder_a/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.deleteGalder_a);
router.route('/client/api/v1/galder_a/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,galder_aController.deleteManyGalder_a);

module.exports = router;
