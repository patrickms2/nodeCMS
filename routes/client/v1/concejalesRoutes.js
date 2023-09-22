/**
 * concejalesRoutes.js
 * @description :: CRUD API routes for concejales
 */

const express = require('express');
const router = express.Router();
const concejalesController = require('../../../controller/client/v1/concejalesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/concejales/create').post(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.addConcejales);
router.route('/client/api/v1/concejales/list').post(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.findAllConcejales);
router.route('/client/api/v1/concejales/count').post(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.getConcejalesCount);
router.route('/client/api/v1/concejales/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.getConcejales);
router.route('/client/api/v1/concejales/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.updateConcejales);    
router.route('/client/api/v1/concejales/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.partialUpdateConcejales);
router.route('/client/api/v1/concejales/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.softDeleteConcejales);
router.route('/client/api/v1/concejales/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.softDeleteManyConcejales);
router.route('/client/api/v1/concejales/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.bulkInsertConcejales);
router.route('/client/api/v1/concejales/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.bulkUpdateConcejales);
router.route('/client/api/v1/concejales/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.deleteConcejales);
router.route('/client/api/v1/concejales/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,concejalesController.deleteManyConcejales);

module.exports = router;
