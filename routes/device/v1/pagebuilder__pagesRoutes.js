/**
 * pagebuilder__pagesRoutes.js
 * @description :: CRUD API routes for pagebuilder__pages
 */

const express = require('express');
const router = express.Router();
const pagebuilder__pagesController = require('../../../controller/device/v1/pagebuilder__pagesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/pagebuilder__pages/create').post(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.addPagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/list').post(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.findAllPagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/count').post(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.getPagebuilder__pagesCount);
router.route('/device/api/v1/pagebuilder__pages/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.getPagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.updatePagebuilder__pages);    
router.route('/device/api/v1/pagebuilder__pages/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.partialUpdatePagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.softDeletePagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.softDeleteManyPagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.bulkInsertPagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.bulkUpdatePagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.deletePagebuilder__pages);
router.route('/device/api/v1/pagebuilder__pages/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,pagebuilder__pagesController.deleteManyPagebuilder__pages);

module.exports = router;
