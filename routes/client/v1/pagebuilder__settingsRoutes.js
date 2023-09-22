/**
 * pagebuilder__settingsRoutes.js
 * @description :: CRUD API routes for pagebuilder__settings
 */

const express = require('express');
const router = express.Router();
const pagebuilder__settingsController = require('../../../controller/client/v1/pagebuilder__settingsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/pagebuilder__settings/create').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.addPagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/list').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.findAllPagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/count').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.getPagebuilder__settingsCount);
router.route('/client/api/v1/pagebuilder__settings/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.getPagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.updatePagebuilder__settings);    
router.route('/client/api/v1/pagebuilder__settings/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.partialUpdatePagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.softDeletePagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.softDeleteManyPagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.bulkInsertPagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.bulkUpdatePagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.deletePagebuilder__settings);
router.route('/client/api/v1/pagebuilder__settings/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__settingsController.deleteManyPagebuilder__settings);

module.exports = router;
