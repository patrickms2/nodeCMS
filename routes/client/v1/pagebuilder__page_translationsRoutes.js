/**
 * pagebuilder__page_translationsRoutes.js
 * @description :: CRUD API routes for pagebuilder__page_translations
 */

const express = require('express');
const router = express.Router();
const pagebuilder__page_translationsController = require('../../../controller/client/v1/pagebuilder__page_translationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/pagebuilder__page_translations/create').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.addPagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/list').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.findAllPagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/count').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.getPagebuilder__page_translationsCount);
router.route('/client/api/v1/pagebuilder__page_translations/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.getPagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.updatePagebuilder__page_translations);    
router.route('/client/api/v1/pagebuilder__page_translations/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.partialUpdatePagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.softDeletePagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.softDeleteManyPagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.bulkInsertPagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.bulkUpdatePagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.deletePagebuilder__page_translations);
router.route('/client/api/v1/pagebuilder__page_translations/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,pagebuilder__page_translationsController.deleteManyPagebuilder__page_translations);

module.exports = router;
