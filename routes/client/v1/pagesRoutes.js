/**
 * pagesRoutes.js
 * @description :: CRUD API routes for pages
 */

const express = require('express');
const router = express.Router();
const pagesController = require('../../../controller/client/v1/pagesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/pages/create').post(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.addPages);
router.route('/client/api/v1/pages/list').post(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.findAllPages);
router.route('/client/api/v1/pages/count').post(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.getPagesCount);
router.route('/client/api/v1/pages/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.getPages);
router.route('/client/api/v1/pages/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.updatePages);    
router.route('/client/api/v1/pages/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.partialUpdatePages);
router.route('/client/api/v1/pages/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.softDeletePages);
router.route('/client/api/v1/pages/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.softDeleteManyPages);
router.route('/client/api/v1/pages/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.bulkInsertPages);
router.route('/client/api/v1/pages/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.bulkUpdatePages);
router.route('/client/api/v1/pages/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.deletePages);
router.route('/client/api/v1/pages/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,pagesController.deleteManyPages);

module.exports = router;
