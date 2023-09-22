/**
 * articlesRoutes.js
 * @description :: CRUD API routes for articles
 */

const express = require('express');
const router = express.Router();
const articlesController = require('../../../controller/client/v1/articlesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/articles/create').post(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.addArticles);
router.route('/client/api/v1/articles/list').post(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.findAllArticles);
router.route('/client/api/v1/articles/count').post(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.getArticlesCount);
router.route('/client/api/v1/articles/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.getArticles);
router.route('/client/api/v1/articles/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.updateArticles);    
router.route('/client/api/v1/articles/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.partialUpdateArticles);
router.route('/client/api/v1/articles/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.softDeleteArticles);
router.route('/client/api/v1/articles/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.softDeleteManyArticles);
router.route('/client/api/v1/articles/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.bulkInsertArticles);
router.route('/client/api/v1/articles/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.bulkUpdateArticles);
router.route('/client/api/v1/articles/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.deleteArticles);
router.route('/client/api/v1/articles/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,articlesController.deleteManyArticles);

module.exports = router;
