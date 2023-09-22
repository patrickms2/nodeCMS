/**
 * pagesRoutes.js
 * @description :: CRUD API routes for pages
 */

const express = require('express');
const router = express.Router();
const pagesController = require('../../../controller/device/v1/pagesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/pages/create').post(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.addPages);
router.route('/device/api/v1/pages/list').post(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.findAllPages);
router.route('/device/api/v1/pages/count').post(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.getPagesCount);
router.route('/device/api/v1/pages/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.getPages);
router.route('/device/api/v1/pages/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.updatePages);    
router.route('/device/api/v1/pages/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.partialUpdatePages);
router.route('/device/api/v1/pages/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.softDeletePages);
router.route('/device/api/v1/pages/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.softDeleteManyPages);
router.route('/device/api/v1/pages/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.bulkInsertPages);
router.route('/device/api/v1/pages/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.bulkUpdatePages);
router.route('/device/api/v1/pages/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.deletePages);
router.route('/device/api/v1/pages/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,pagesController.deleteManyPages);

module.exports = router;
