/**
 * rolesRoutes.js
 * @description :: CRUD API routes for roles
 */

const express = require('express');
const router = express.Router();
const rolesController = require('../../../controller/client/v1/rolesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/roles/create').post(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.addRoles);
router.route('/client/api/v1/roles/list').post(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.findAllRoles);
router.route('/client/api/v1/roles/count').post(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.getRolesCount);
router.route('/client/api/v1/roles/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.getRoles);
router.route('/client/api/v1/roles/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.updateRoles);    
router.route('/client/api/v1/roles/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.partialUpdateRoles);
router.route('/client/api/v1/roles/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.softDeleteRoles);
router.route('/client/api/v1/roles/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.softDeleteManyRoles);
router.route('/client/api/v1/roles/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.bulkInsertRoles);
router.route('/client/api/v1/roles/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.bulkUpdateRoles);
router.route('/client/api/v1/roles/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.deleteRoles);
router.route('/client/api/v1/roles/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,rolesController.deleteManyRoles);

module.exports = router;
