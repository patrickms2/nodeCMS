/**
 * rolesRoutes.js
 * @description :: CRUD API routes for roles
 */

const express = require('express');
const router = express.Router();
const rolesController = require('../../../controller/device/v1/rolesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/roles/create').post(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.addRoles);
router.route('/device/api/v1/roles/list').post(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.findAllRoles);
router.route('/device/api/v1/roles/count').post(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.getRolesCount);
router.route('/device/api/v1/roles/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.getRoles);
router.route('/device/api/v1/roles/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.updateRoles);    
router.route('/device/api/v1/roles/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.partialUpdateRoles);
router.route('/device/api/v1/roles/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.softDeleteRoles);
router.route('/device/api/v1/roles/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.softDeleteManyRoles);
router.route('/device/api/v1/roles/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.bulkInsertRoles);
router.route('/device/api/v1/roles/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.bulkUpdateRoles);
router.route('/device/api/v1/roles/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.deleteRoles);
router.route('/device/api/v1/roles/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,rolesController.deleteManyRoles);

module.exports = router;
