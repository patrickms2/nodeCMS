/**
 * admin_role_permissionRoutes.js
 * @description :: CRUD API routes for admin_role_permission
 */

const express = require('express');
const router = express.Router();
const admin_role_permissionController = require('../../../controller/device/v1/admin_role_permissionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admin_role_permission/create').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.addAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/list').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.findAllAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/count').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.getAdmin_role_permissionCount);
router.route('/device/api/v1/admin_role_permission/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.getAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.updateAdmin_role_permission);    
router.route('/device/api/v1/admin_role_permission/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.partialUpdateAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.softDeleteAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.softDeleteManyAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.bulkInsertAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.bulkUpdateAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.deleteAdmin_role_permission);
router.route('/device/api/v1/admin_role_permission/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_role_permissionController.deleteManyAdmin_role_permission);

module.exports = router;
