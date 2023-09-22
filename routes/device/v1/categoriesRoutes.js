/**
 * categoriesRoutes.js
 * @description :: CRUD API routes for categories
 */

const express = require('express');
const router = express.Router();
const categoriesController = require('../../../controller/device/v1/categoriesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/categories/create').post(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.addCategories);
router.route('/device/api/v1/categories/list').post(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.findAllCategories);
router.route('/device/api/v1/categories/count').post(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.getCategoriesCount);
router.route('/device/api/v1/categories/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.getCategories);
router.route('/device/api/v1/categories/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.updateCategories);    
router.route('/device/api/v1/categories/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.partialUpdateCategories);
router.route('/device/api/v1/categories/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.softDeleteCategories);
router.route('/device/api/v1/categories/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.softDeleteManyCategories);
router.route('/device/api/v1/categories/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.bulkInsertCategories);
router.route('/device/api/v1/categories/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.bulkUpdateCategories);
router.route('/device/api/v1/categories/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.deleteCategories);
router.route('/device/api/v1/categories/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,categoriesController.deleteManyCategories);

module.exports = router;
