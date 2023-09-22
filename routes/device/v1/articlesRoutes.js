/**
 * articlesRoutes.js
 * @description :: CRUD API routes for articles
 */

const express = require('express');
const router = express.Router();
const articlesController = require('../../../controller/device/v1/articlesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/articles/create').post(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.addArticles);
router.route('/device/api/v1/articles/list').post(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.findAllArticles);
router.route('/device/api/v1/articles/count').post(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.getArticlesCount);
router.route('/device/api/v1/articles/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.getArticles);
router.route('/device/api/v1/articles/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.updateArticles);    
router.route('/device/api/v1/articles/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.partialUpdateArticles);
router.route('/device/api/v1/articles/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.softDeleteArticles);
router.route('/device/api/v1/articles/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.softDeleteManyArticles);
router.route('/device/api/v1/articles/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.bulkInsertArticles);
router.route('/device/api/v1/articles/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.bulkUpdateArticles);
router.route('/device/api/v1/articles/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.deleteArticles);
router.route('/device/api/v1/articles/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,articlesController.deleteManyArticles);

module.exports = router;
