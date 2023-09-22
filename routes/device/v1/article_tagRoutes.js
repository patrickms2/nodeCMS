/**
 * article_tagRoutes.js
 * @description :: CRUD API routes for article_tag
 */

const express = require('express');
const router = express.Router();
const article_tagController = require('../../../controller/device/v1/article_tagController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/article_tag/create').post(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.addArticle_tag);
router.route('/device/api/v1/article_tag/list').post(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.findAllArticle_tag);
router.route('/device/api/v1/article_tag/count').post(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.getArticle_tagCount);
router.route('/device/api/v1/article_tag/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.getArticle_tag);
router.route('/device/api/v1/article_tag/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.updateArticle_tag);    
router.route('/device/api/v1/article_tag/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.partialUpdateArticle_tag);
router.route('/device/api/v1/article_tag/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.softDeleteArticle_tag);
router.route('/device/api/v1/article_tag/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.softDeleteManyArticle_tag);
router.route('/device/api/v1/article_tag/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.bulkInsertArticle_tag);
router.route('/device/api/v1/article_tag/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.bulkUpdateArticle_tag);
router.route('/device/api/v1/article_tag/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.deleteArticle_tag);
router.route('/device/api/v1/article_tag/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,article_tagController.deleteManyArticle_tag);

module.exports = router;
