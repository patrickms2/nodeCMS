/**
 * pagebuilder__uploadsRoutes.js
 * @description :: CRUD API routes for pagebuilder__uploads
 */

const express = require('express');
const router = express.Router();
const pagebuilder__uploadsController = require('../../../controller/client/v1/pagebuilder__uploadsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/pagebuilder__uploads/create').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.addPagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/list').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.findAllPagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/count').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.getPagebuilder__uploadsCount);
router.route('/client/api/v1/pagebuilder__uploads/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.getPagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.updatePagebuilder__uploads);    
router.route('/client/api/v1/pagebuilder__uploads/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.partialUpdatePagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.softDeletePagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.softDeleteManyPagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.bulkInsertPagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.bulkUpdatePagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.deletePagebuilder__uploads);
router.route('/client/api/v1/pagebuilder__uploads/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__uploadsController.deleteManyPagebuilder__uploads);

module.exports = router;
