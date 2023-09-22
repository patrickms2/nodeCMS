/**
 * concejalesRoutes.js
 * @description :: CRUD API routes for concejales
 */

const express = require('express');
const router = express.Router();
const concejalesController = require('../../../controller/device/v1/concejalesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/concejales/create').post(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.addConcejales);
router.route('/device/api/v1/concejales/list').post(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.findAllConcejales);
router.route('/device/api/v1/concejales/count').post(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.getConcejalesCount);
router.route('/device/api/v1/concejales/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.getConcejales);
router.route('/device/api/v1/concejales/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.updateConcejales);    
router.route('/device/api/v1/concejales/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.partialUpdateConcejales);
router.route('/device/api/v1/concejales/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.softDeleteConcejales);
router.route('/device/api/v1/concejales/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.softDeleteManyConcejales);
router.route('/device/api/v1/concejales/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.bulkInsertConcejales);
router.route('/device/api/v1/concejales/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.bulkUpdateConcejales);
router.route('/device/api/v1/concejales/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.deleteConcejales);
router.route('/device/api/v1/concejales/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,concejalesController.deleteManyConcejales);

module.exports = router;
