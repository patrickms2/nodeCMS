/**
 * admin_permissionsRoutes.js
 * @description :: CRUD API routes for admin_permissions
 */

const express = require('express');
const router = express.Router();
const admin_permissionsController = require('../../../controller/device/v1/admin_permissionsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admin_permissions/create').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.addAdmin_permissions);
router.route('/device/api/v1/admin_permissions/list').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.findAllAdmin_permissions);
router.route('/device/api/v1/admin_permissions/count').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.getAdmin_permissionsCount);
router.route('/device/api/v1/admin_permissions/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.getAdmin_permissions);
router.route('/device/api/v1/admin_permissions/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.updateAdmin_permissions);    
router.route('/device/api/v1/admin_permissions/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.partialUpdateAdmin_permissions);
router.route('/device/api/v1/admin_permissions/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.softDeleteAdmin_permissions);
router.route('/device/api/v1/admin_permissions/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.softDeleteManyAdmin_permissions);
router.route('/device/api/v1/admin_permissions/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.bulkInsertAdmin_permissions);
router.route('/device/api/v1/admin_permissions/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.bulkUpdateAdmin_permissions);
router.route('/device/api/v1/admin_permissions/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.deleteAdmin_permissions);
router.route('/device/api/v1/admin_permissions/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,admin_permissionsController.deleteManyAdmin_permissions);

module.exports = router;
