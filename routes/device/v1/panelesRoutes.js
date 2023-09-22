/**
 * panelesRoutes.js
 * @description :: CRUD API routes for paneles
 */

const express = require('express');
const router = express.Router();
const panelesController = require('../../../controller/device/v1/panelesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/paneles/create').post(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.addPaneles);
router.route('/device/api/v1/paneles/list').post(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.findAllPaneles);
router.route('/device/api/v1/paneles/count').post(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.getPanelesCount);
router.route('/device/api/v1/paneles/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.getPaneles);
router.route('/device/api/v1/paneles/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.updatePaneles);    
router.route('/device/api/v1/paneles/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.partialUpdatePaneles);
router.route('/device/api/v1/paneles/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.softDeletePaneles);
router.route('/device/api/v1/paneles/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.softDeleteManyPaneles);
router.route('/device/api/v1/paneles/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.bulkInsertPaneles);
router.route('/device/api/v1/paneles/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.bulkUpdatePaneles);
router.route('/device/api/v1/paneles/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.deletePaneles);
router.route('/device/api/v1/paneles/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,panelesController.deleteManyPaneles);

module.exports = router;
