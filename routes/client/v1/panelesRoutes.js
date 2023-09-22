/**
 * panelesRoutes.js
 * @description :: CRUD API routes for paneles
 */

const express = require('express');
const router = express.Router();
const panelesController = require('../../../controller/client/v1/panelesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/paneles/create').post(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.addPaneles);
router.route('/client/api/v1/paneles/list').post(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.findAllPaneles);
router.route('/client/api/v1/paneles/count').post(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.getPanelesCount);
router.route('/client/api/v1/paneles/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.getPaneles);
router.route('/client/api/v1/paneles/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.updatePaneles);    
router.route('/client/api/v1/paneles/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.partialUpdatePaneles);
router.route('/client/api/v1/paneles/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.softDeletePaneles);
router.route('/client/api/v1/paneles/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.softDeleteManyPaneles);
router.route('/client/api/v1/paneles/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.bulkInsertPaneles);
router.route('/client/api/v1/paneles/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.bulkUpdatePaneles);
router.route('/client/api/v1/paneles/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.deletePaneles);
router.route('/client/api/v1/paneles/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,panelesController.deleteManyPaneles);

module.exports = router;
