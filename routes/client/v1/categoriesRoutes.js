/**
 * categoriesRoutes.js
 * @description :: CRUD API routes for categories
 */

const express = require('express');
const router = express.Router();
const categoriesController = require('../../../controller/client/v1/categoriesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/categories/create').post(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.addCategories);
router.route('/client/api/v1/categories/list').post(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.findAllCategories);
router.route('/client/api/v1/categories/count').post(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.getCategoriesCount);
router.route('/client/api/v1/categories/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.getCategories);
router.route('/client/api/v1/categories/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.updateCategories);    
router.route('/client/api/v1/categories/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.partialUpdateCategories);
router.route('/client/api/v1/categories/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.softDeleteCategories);
router.route('/client/api/v1/categories/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.softDeleteManyCategories);
router.route('/client/api/v1/categories/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.bulkInsertCategories);
router.route('/client/api/v1/categories/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.bulkUpdateCategories);
router.route('/client/api/v1/categories/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.deleteCategories);
router.route('/client/api/v1/categories/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,categoriesController.deleteManyCategories);

module.exports = router;
