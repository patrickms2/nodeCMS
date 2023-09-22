/**
 * tagsRoutes.js
 * @description :: CRUD API routes for tags
 */

const express = require('express');
const router = express.Router();
const tagsController = require('../../../controller/client/v1/tagsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/tags/create').post(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.addTags);
router.route('/client/api/v1/tags/list').post(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.findAllTags);
router.route('/client/api/v1/tags/count').post(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.getTagsCount);
router.route('/client/api/v1/tags/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.getTags);
router.route('/client/api/v1/tags/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.updateTags);    
router.route('/client/api/v1/tags/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.partialUpdateTags);
router.route('/client/api/v1/tags/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.softDeleteTags);
router.route('/client/api/v1/tags/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.softDeleteManyTags);
router.route('/client/api/v1/tags/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.bulkInsertTags);
router.route('/client/api/v1/tags/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.bulkUpdateTags);
router.route('/client/api/v1/tags/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.deleteTags);
router.route('/client/api/v1/tags/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,tagsController.deleteManyTags);

module.exports = router;
